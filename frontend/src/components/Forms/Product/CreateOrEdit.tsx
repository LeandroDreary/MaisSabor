import React, { FormEvent, useEffect, useState } from "react";
import api, { authorization } from "../../../services/api";
import CurrencyInput from "react-currency-input-field";
import Outclick from "../../Outclick";
import Warning, { WarningType } from "../../Warning";
import CreateOrEditCategory, { CategoryType } from "../Category/CreateOrEdit";
import { useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";
import AOS from "aos";
AOS.init();

export type ProductType = {
  _id: string;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  image?: string;
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


  const history = useHistory();

  // The category will display in the category input
  const [categories, setCategories] = useState<CategoryType[]>([]);


  // form inputs
  const [name, setName] = useState<string>(datas.product?.name || "");
  const [description, setDescription] = useState<string>(datas.product?.description || "");
  const [category, setCategory] = useState<string>(datas.product?.category || "");
  const [price, setPrice] = useState<number>(datas.product?.price || 0.0);
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
      if (name.length < 3)
        myWarnings.push({ input: "name", message: "O nome do produto deve ter no mínimo 3 caracteres.", type: "warning" });
      if (!category)
        myWarnings.push({ input: "category", message: "Você não selecionou uma categoria.", type: "warning" });

      setWarnings(myWarnings);
      if (myWarnings.length > 0) return;


      // Saving data
      let form = new FormData()
      form.append("name", name)
      form.append("description", description)
      form.append("category", category)
      form.append("price", price.toString())

      if (files[0]?.name)
        form.append("image", files[0])
      else if (files[0]?.preview) {
        form.append("image", files[0].preview)
      }

      if (!datas.product?._id) {
        // Create product
        await api.post("/products", form, { headers: { authorization } }).then(response => {
          console.log(response.data)
          history.push("/admin/products");
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
          console.log(response.data)
          history.push("/admin/products");
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

  useEffect(() => {
    HandleLoadCategories();
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
                    <CreateOrEditCategory
                      datas={{}}
                      callBack={() => {
                        HandleLoadCategories();
                        setPopup("");
                      }}
                    />
                  ),
                  "": <></>,
                }[popup]
              }
            </div>
          </Outclick>
        </div>
      )}
      <form
        onSubmit={HandleSubmit}
        style={{ maxWidth: "700px" }}
        className="mx-4 px-4 py-4 my-4"
      >
        {
          errors &&
          <div className="pb-2">
            {errors.filter(error => error.showIn === 'sendForm').map(error =>
              <p className="zoom-init-anim bg-red-50 text-red-500 px-2 py-1 border-red-600 border rounded my-2">{error.message}</p>
            )}
          </div>
        }
        <div className="w-full my-2">
          <Dropzone
            accept="image/*"
            onDrop={(acceptedFiles) => {
              setFiles(
                acceptedFiles.map(file =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  })
                )
              );
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section
                style={{ maxWidth: "500px" }}
                className="bg-yellow-50 text-yellow-700 border border-yellow-700 p-4"
              >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {files.length > 0 ? (
                    files.map((file) => (
                      <img
                        key={file.name}
                        className="max-h-80 mx-auto"
                        src={file.preview}
                        alt={file.name}
                      />
                    ))
                  ) : (
                    <p>
                      Arraste uma imagem aqui ou clique para selecionar uma
                      imagem.
                    </p>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
          <button
            type="button"
            className="my-2 bg-red-600 hover:bg-red-800 ease-in-out duration-300 text-white py-2 px-4 "
            onClick={() => setFiles([])}
          >
            Remover imagem
          </button>
        </div>
        <div className="w-full my-2">
          <label className="text-gray-600" htmlFor="name">
            Nome:
          </label>
          <div className="bg-white flex border border-gray-200 rounded">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Nome"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
            />
          </div>
          <Warning datas={{ warnings, input: "name" }} />
        </div>
        <div className="w-full my-2">
          <label className="text-gray-600" htmlFor="description">
            Descrição:
          </label>
          <div className="bg-white flex border border-gray-200 rounded">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              placeholder="Descrição"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
            ></textarea>
          </div>
          <Warning datas={{ warnings, input: "description" }} />
        </div>
        <div className="w-full my-2">
          <label className="text-gray-600" htmlFor="category">
            Categoria:
          </label>
          <div className="flex">
            <div className="bg-white px-1 w-40 flex border border-gray-200 rounded">
              <select
                value={category}
                onChange={(e) => {
                  console.log(e.target.value);
                  setCategory(e.target.value);
                }}
                name="category"
                className="form-select p-1 px-2 appearance-none outline-none w-full text-gray-600"
              >
                <option value="">Escolher categoria</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <button
              onClick={() => setPopup("create-category")}
              type="button"
              className="mx-2 bg-yellow-400 hover:bg-yellow-500 duration-300 text-white h-10 py-2 px-6 rounded cursor-pointer"
            >
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
              name="price"
              defaultValue={datas.product?.price || 0.0}
              onValueChange={(value) =>
                setPrice(Number(value?.replaceAll(",", ".")))
              }
              intlConfig={{ locale: "pt-BR", currency: "BRL" }}
              decimalScale={2}
              className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
            />
          </div>
          <Warning datas={{ warnings, input: "price" }} />
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
