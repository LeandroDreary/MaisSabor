import React, { useState } from "react";
import { useEffect } from "react";
import CreateOrEditCategory from "../../../components/Forms/CreateOrEditCategory";
import Outclick from "../../../components/Outclick";
import AdminLayout from "../../../layout/AdminLayout";
import { db } from "../../../services/firebase";
import "./index.css";

type CategoryType = {
  name: string;
  id: string;
};

const Index = () => {
  const [popup, setPopup] = useState<"" | "create-category">("");

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const HandleLoadCategories = async () => {
    await db
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        let myCategories: CategoryType[] = [];
        querySnapshot.forEach((doc) => {
          myCategories.push({ id: doc.id, name: doc.data().name });
        });
        setCategories(myCategories);
      });
  };

  useEffect(() => {
    HandleLoadCategories();
  }, []);

  return (
    <>
      {popup !== "" && (
        <div className="fixed flex items-center justify-center top-0 left-0 h-screen w-screen bg-black bg-opacity-70">
          <Outclick callback={() => setPopup("")}>
            <div>
              {
                {
                  "create-category": (
                    <CreateOrEditCategory
                      Submit={() => {
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
      <AdminLayout>
        <div className="container mt-12 mx-auto">
          <span className="text-2xl mx-6 px-2 add-product-title-underline">
            Criar novo produto
          </span>
          <div style={{ maxWidth: "700px" }} className="mx-4 px-4 py-4 my-4">
            <div className="w-full my-2">
              <label htmlFor="name">Nome:</label>
              <div className="bg-white flex border border-gray-200 rounded">
                <input
                  name="name"
                  placeholder="Nome"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                />
              </div>
            </div>
            <div className="w-full my-2">
              <label htmlFor="description">Descrição:</label>
              <div className="bg-white flex border border-gray-200 rounded">
                <textarea
                  name="description"
                  placeholder="Descrição"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                ></textarea>
              </div>
            </div>
            <div className="w-full my-2">
              <label htmlFor="category">Categoria:</label>
              <div className="flex">
                <div className="bg-white px-1 w-40 flex border border-gray-200 rounded">
                  <select name="category" className="form-select w-full">
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setPopup("create-category")}
                  style={{ background: "rgb(237, 201, 0)" }}
                  className="mx-2 text-white h-10 py-2 px-6 rounded cursor-pointer"
                >
                  Nova Categoria
                </button>
              </div>
            </div>
            <div className="w-full my-2">
              <label htmlFor="price">Preço:</label>
              <div className="bg-white w-40 flex border border-gray-200 rounded">
                <input
                  name="price"
                  placeholder="0.00"
                  type="text"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                />
              </div>
            </div>
            <hr className="my-4" />
            <button
              style={{ background: "rgb(237, 201, 0)" }}
              className="mx-2 text-white h-10 py-2 px-6 rounded cursor-pointer"
              type="submit"
            >
              Criar produto
            </button>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Index;
