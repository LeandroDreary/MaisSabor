import React, { FormEvent, useEffect, useState } from "react";
import { db, storage } from "../../../services/firebase";
import CurrencyInput from "react-currency-input-field";
import Outclick from "../../Outclick";
import Warning, { WarningType } from "../../Warning";
import CreateOrEditCategory, { CategoryType } from "../Category/CreateOrEdit";
import { useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";
import AOS from "aos";
AOS.init();

export type ProductType = {
  id: string;
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
  const [warnings, setWarnings] = useState<WarningType[]>();

  const [popup, setPopup] = useState<"" | "create-category">("");

  const history = useHistory();

  // form inputs
  const [name, setName] = useState<string>(datas.product?.name || "");
  const [description, setDescription] = useState<string>(datas.product?.description || "");
  const [category, setCategory] = useState<string>(datas.product?.category || "");
  const [price, setPrice] = useState<number>(datas.product?.price || 0.0);
  const [files, setFiles] = useState<(File & { preview: string } | any & { preview: string })[]>(datas.product?.image ? [{ preview: datas.product?.image }] : []);

  const UploadImage = async (file: File, { path, name }: { path: string, name: string }) => {
    let ref = storage.ref();
    return await ref.child(`${path}/${name}`).put(file).then(async (snapshot) => {
      // Get the image url
      return await storage.ref(`${path}/${name}`).getDownloadURL();
    });
  }

  //Submit form
  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Set the warnings that occurs in the process
    const myWarnings: WarningType[] = [];

    // datas filter
    if (name.length < 3)
      myWarnings.push({ input: "name", message: "O nome do produto deve ter no mínimo 3 caracteres.", type: "warning" });
    if (!category)
      myWarnings.push({ input: "category", message: "Você não selecionou uma categoria.", type: "warning" });

    if (myWarnings.length > 0) {
      setWarnings(myWarnings);
      return;
    }

    try {
      let image = ""
      // If it's going to update or create a product
      if (!datas.product?.id) {
        // The create product path
        // Saving informations about the product in the database
        await db.collection("products").add({ name, description, category, price }).then(async product => {
          // Uploading the image of the product if the file exist
          if (files[0]) {
            // If the image is already uploaded or if it's going to upload a new image
            if (files[0].name)
              image = await UploadImage(files[0], { path: "images/products", name: product.id })
            else
              image = files[0].preview
            product.update({ name, description, image, category, price });
          }
          myWarnings.push({ input: "", message: "Categoria adicionada com sucesso!", type: "success" });
        }).catch((error) => {
          myWarnings.push({ input: "", message: "Erro ao criar categoria.", type: "error" });

          throw new Error(error);
        });
      } else {
        // The update product path
        if (files[0]) {
          // If the image is already uploaded or if it's going to upload a new image
          if (files[0].name)
            image = await UploadImage(files[0], { path: "images/products", name: datas.product.id })
          else
            image = files[0].preview
        }
        // Saving informations about the product in the database
        await db.collection("products").doc(datas.product?.id).update({ name, image, description, category, price }).then(() => {
          myWarnings.push({ input: "", message: "Categoria editada com sucesso!", type: "success" })
        }).catch((error) => {
          myWarnings.push({ input: "", message: "Erro ao editar categoria.", type: "error" });
          throw new Error(error);
        });
      }
    } catch (error) {
      myWarnings.push({ input: "", message: `Algo deu errado. Erro: ${error}`, type: "error" });
      console.error("Something went wrong: ", error);
    }

    setWarnings(myWarnings);

    // Seeing if have ocurreted any problem. If doesn't then the user will be redirected to product list  
    if (myWarnings.filter((myWarning) => myWarning.type === "error").length <= 0) {
      callBack && callBack({ warnings: myWarnings });
      history.push("/admin/products");
      return;
    }
  };

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const HandleLoadCategories = async () => {
    // Load the categories that will show in the category select input
    await db.collection("categories").get().then((querySnapshot) => {
      let myCategories: CategoryType[] = [];
      querySnapshot.forEach(doc => myCategories.push({ id: doc.id, name: doc.data().name }));
      setCategories(myCategories);
    });
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
                    <option key={category.id} value={category.id}>
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
          {datas.product?.id ? "Editar produto" : "Criar produto"}
        </button>
      </form>
    </>
  );
};

export default Index;
