import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api, { authorization } from "../../../services/api";

import CurrencyInput from "react-currency-input-field";
import Dropzone from "react-dropzone";
import Outclick from "../../Utils/Outclick";
import Warning, { WarningType } from "../../Utils/Warning";
import CreateOrEditCategory, { CategoryType } from "../Category/CreateOrEdit";

import AOS from "aos";
AOS.init();

export type ProductType = {
  _id: string;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  image?: string;
  ingredients?: string[];
};

type CreateOrEditProductProps = {
  datas: {
    product?: ProductType;
  };
  callBack?: ({
    productDoc,
    warnings,
  }: {
    productDoc?: ProductType;
    warnings?: WarningType[];
  }) => any;
};

const Index = ({ datas, callBack }: CreateOrEditProductProps) => {
  // Which of the popups will appear in the screen.
  const [popup, setPopup] = useState<"" | "create-category">("");


  // Store ocurred errors when send data to api 
  const [errors, setErrors] = useState<{ code?: string, message: string, showIn: string }[]>();
  // Warnings in the form inputs
  const [warnings, setWarnings] = useState<WarningType[]>();
  // form state
  const [loading, setLoading] = useState<boolean>(false);

  let navigate = useNavigate();

  // The category will display in the category input
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [ingredients, setIngredients] = useState<{ _id: string; name: string; }[]>([]);

  // form inputs
  const [productForm, setProductForm] = useState<ProductType>(datas.product)
  const [files, setFiles] = useState<(File & { preview: string } | any & { preview: string })[]>(datas.product?.image ? [{ preview: datas.product?.image }] : []);


  //Submit form
  const HandleSubmit = async (e: FormEvent) => {
    if (loading) return;
    setLoading(true)

    try {
      e.preventDefault();
      // Set the warnings that occurs in the process
      const myWarnings: WarningType[] = [];

      // datas filter
      if ((productForm?.name ?? "").length < 3)
        myWarnings.push({ input: "name", message: "O nome do produto deve ter no mínimo 3 caracteres.", type: "warning" });
      if (!productForm?.category)
        myWarnings.push({ input: "category", message: "Você não selecionou uma categoria.", type: "warning" });

      setWarnings(myWarnings);
      if (myWarnings.length > 0) return;


      // Saving data
      let form = new FormData()
      form.append("name", productForm.name)
      form.append("description", productForm.description)
      form.append("category", productForm.category)
      form.append("price", productForm.price.toString())
      form.append("ingredients", JSON.stringify(productForm.ingredients))

      if (files[0]?.name)
        form.append("image", files[0])
      else if (files[0]?.preview) {
        form.append("image", files[0].preview)
      }

      if (!datas.product?._id) {
        // Create product
        await api.post("/products", form, { headers: { authorization } }).then(response => {
          navigate("/admin/products");
        }).catch(error => {
          console.error(error.response.data)
          if (error.response.data.message)
            setErrors([{ ...error.response.data, showIn: "sendForm" }])
          else
            setErrors([{ message: "Ocorreu um erro desconhecido.", showIn: "sendForm" }])
        })
      } else {
        // Update product
        form.append("_id", datas.product._id)
        await api.put("/products", form, { headers: { authorization } }).then(response => {
          navigate("/admin/products");
        }).catch(error => {
          console.error(error.response.data)
          if (error.response.data.message)
            setErrors([{ ...error.response.data, showIn: "sendForm" }])
          else
            setErrors([{ message: "Ocorreu um erro desconhecido.", showIn: "sendForm" }])
        })
      }
    } finally {
      setLoading(false)
    }
  };

  const HandleLoadCategories = async () => {
    // Load the categories that will show in the category select input
    await api.get("/categories/list").then(response => {
      setCategories(response.data.categories)
    })
  };

  const HandleLoadIngredients = async () => {
    await api.get("/ingredients/list").then(response => {
      setIngredients(response.data.ingredients)
    })
  };

  useEffect(() => {
    HandleLoadCategories();
    HandleLoadIngredients();
  }, []);

  return (
    <>
      {popup !== "" && (
        <div className="fixed z-10 flex items-center justify-center top-0 left-0 h-screen w-screen bg-black bg-opacity-70">

          <Outclick callback={() => setPopup("")}>
            <div>
              {
                {
                  "create-category": (
                    <CreateOrEditCategory datas={{}} callBack={idCategory => { console.log(idCategory); setProductForm({ ...productForm, category: idCategory }); HandleLoadCategories(); setPopup(""); }}
                    />
                  ),
                  "": <></>,
                }[popup]
              }
            </div>
          </Outclick>
        </div>
      )}
      <form onSubmit={HandleSubmit} style={{ maxWidth: "700px" }} className="mx-4 px-4 py-4 my-4">
        {
          errors &&
          <div className="pb-2">
            {errors.filter(error => error.showIn === 'sendForm').map(error =>
              <p className="zoom-init-anim bg-red-50 text-red-500 px-2 py-1 border-red-600 border rounded my-2">{error.message}</p>
            )}
          </div>
        }
        <div className="w-full my-2">
          <Dropzone accept="image/*" onDrop={(acceptedFiles) => {
            setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })))
          }}>
            {({ getRootProps, getInputProps }) => (
              <section style={{ maxWidth: "500px" }} className="bg-yellow-50 text-yellow-700 border border-yellow-700">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {files.length > 0 ? (
                    files.map(file => (
                      <img key={file.name} className="max-h-80 mx-auto p-2" src={file.preview} alt={file.name} />
                    ))
                  ) : (<p className="p-4">Arraste uma imagem aqui ou clique para selecionar uma imagem.</p>)}
                </div>
              </section>
            )}
          </Dropzone>
          <button type="button" className="my-2 bg-red-600 hover:bg-red-800 ease-in-out duration-300 text-white py-2 px-4 " onClick={() => setFiles([])}>
            Remover imagem
          </button>
        </div>
        <div className="w-full my-2">
          <label className="text-gray-600" htmlFor="name">
            Nome:
          </label>
          <div className="bg-white flex border border-gray-200 rounded">
            <input value={productForm?.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} name="name" placeholder="Nome" className="p-1 px-2 appearance-none outline-none w-full text-gray-600" />
          </div>
          <Warning datas={{ warnings, input: "name" }} />
        </div>
        <div className="w-full my-2">
          <label className="text-gray-600" htmlFor="description">
            Descrição:
          </label>
          <div className="bg-white flex border border-gray-200 rounded">
            <textarea value={productForm?.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} name="description"
              placeholder="Descrição" className="p-1 px-2 appearance-none outline-none w-full text-gray-600"></textarea>
          </div>
          <Warning datas={{ warnings, input: "description" }} />
        </div>
        <div className="w-full my-2">
          <label className="text-gray-600" htmlFor="category">
            Categoria:
          </label>
          <div className="flex">
            <div className="bg-white px-1 w-40 flex border border-gray-200 rounded">
              <select value={productForm?.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                name="category" className="form-select p-1 px-2 appearance-none outline-none w-full text-gray-600">
                <option value="">Escolher categoria</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <button onClick={() => setPopup("create-category")} type="button"
              className="mx-2 bg-yellow-400 hover:bg-yellow-500 duration-300 text-white py-2 px-6 rounded cursor-pointer">
              Nova Categoria
            </button>
          </div>
          <Warning datas={{ warnings, input: "category" }} />
        </div>
        <div className="w-full my-2">
          <label className="text-gray-600" htmlFor="price">
            Preço:
          </label>
          <div className="bg-white w-40 flex border border-gray-200 rounded">
            <CurrencyInput
              name="price" defaultValue={datas.product?.price || 0.0} onValueChange={(value) => setProductForm({ ...productForm, price: Number(value?.replaceAll(",", ".")) })}
              intlConfig={{ locale: "pt-BR", currency: "BRL" }} decimalScale={2} className="p-1 px-2 appearance-none outline-none w-full text-gray-600" />
          </div>
          <Warning datas={{ warnings, input: "price" }} />
        </div>
        <div className="w-full my-2">
          <label className="text-gray-600" htmlFor="ingredients">
            Ingredientes:
          </label>
          <div className="flex">
            <div className="grow bg-white w-full p-2 border border-gray-200 rounded">
              {ingredients?.filter(ingredient => productForm?.ingredients?.includes(ingredient?._id)).map(ingredient =>
                <button type="button" onClick={() => setProductForm({ ...productForm, ingredients: productForm.ingredients.filter(ing => ing !== ingredient._id) })} key={ingredient._id} className="inline-block border-green-500 text-green-500 rounded border px-2 m-2 cursor-pointer">
                  {ingredient.name}
                </button>
              )}
              {ingredients?.filter(ingredient => !productForm?.ingredients?.includes(ingredient?._id)).map(ingredient =>
                <button type="button" onClick={() => setProductForm({ ...productForm, ingredients: [...productForm.ingredients, ingredient._id] })} key={ingredient._id} className="inline-block border-gray-500 text-gray-500 rounded border px-2 m-2 cursor-pointer">
                  {ingredient.name}
                </button>
              )}

            </div>
            <div>
              <button onClick={() => setPopup("create-category")} type="button" className="mx-2 bg-yellow-400 hover:bg-yellow-500 duration-300 text-white py-1 px-2 rounded cursor-pointer">
                Novo Ingrediente
              </button>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <button className="mx-2 text-white bg-yellow-400 hover:bg-yellow-500 duration-300 h-10 py-2 px-6 rounded cursor-pointer" type="submit">
          {loading ? "carregando..." : datas.product?._id ? "Editar produto" : "Criar produto"}
        </button>
      </form>
    </>
  );
};

export default Index;
