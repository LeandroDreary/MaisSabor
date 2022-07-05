import React, { FormEvent, useState, useEffect } from "react";

import api, { authorization } from "../../../services/api";

import CreateOrEditCategory, { CategoryType } from "../../../components/Forms/Category/CreateOrEdit";
import Outclick from "../../../components/Utils/Outclick";

import AdminLayout from "../../../layout/AdminLayout";

import "./index.css";
import { VscLoading, BiTrash, BiPencil } from "react-icons/all"

const Index = () => {
  // The popup selected to show in the screen 
  const [popup, setPopup] = useState<"" | "create-category" | "edit-category" | "delete-category">("");


  // Store ocurred errors when send data to api 
  const [errors, setErrors] = useState<{ code?: string, message: string, showIn: string }[]>();
  const [loading, setLoading] = useState<boolean>(false);


  // Categories loaded
  const [categories, setCategories] = useState<CategoryType[]>([]);


  // Variable to store the category that will be edited
  const [editSelectedCategory, setEditSelectedCategory] = useState<CategoryType>();
  // Variable to store the category that will be deleted
  const [deleteSelectedCategory, setDeleteSelectedCategory] = useState<CategoryType>();

  const HandleDeleteCategory = async (e: FormEvent) => {
    e.preventDefault();

    // Delete category
    await api.delete(`/categories?_id=${deleteSelectedCategory?._id}`, { headers: { authorization } }).then(resp => {
      setPopup("")
      HandleLoadCategories();
    }).catch(error => {
      console.error(error.response.data)
      if (error.response.data.message)
        setErrors([{ ...error.response.data, showIn: "delete" }])
      else
        setErrors([{ message: "Ocorreu um erro desconhecido.", showIn: "delete" }])
    })
  }

  const HandleLoadCategories = async () => {
    setLoading(true)
    try {
      // Getting the categories in the database
      await api.get("/categories/list").then(resp => {
        setCategories(resp.data.categories)
      }).catch(error => {
        console.error(error.response.data)
        if (error.response.data.message)
          setErrors([{ ...error.response.data, showIn: "load" }])
        else
          setErrors([{ message: "Ocorreu um erro desconhecido.", showIn: "load" }])
      })
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    HandleLoadCategories();
  }, []);


  return (
    <>
      {popup !== "" && (
        <div className="fixed z-10 flex items-center justify-center top-0 left-0 h-screen w-screen bg-black bg-opacity-70">
          <Outclick
            callback={() => {
              setPopup("");
              setEditSelectedCategory(undefined);
              setErrors([])
            }}
          >
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
                  "edit-category": (
                    <CreateOrEditCategory
                      datas={{ category: editSelectedCategory }}
                      callBack={() => {
                        HandleLoadCategories();
                        setPopup("");
                      }}
                    />
                  ),
                  "delete-category": (
                    <form
                      data-aos="fade-down"
                      data-aos-duration="1000"
                      className="bg-white p-8 rounded"
                      onSubmit={HandleDeleteCategory}
                    >
                      <h2 className="text-2xl font-semibold text-gray-700">
                        Apagar categoria
                      </h2>
                      {
                        errors && errors.filter(err => err.showIn === "delete").map(error =>
                          <p key={error.message} className="bg-red-50 text-red-500 px-2 py-1 border-red-600 border rounded my-2">{error.message}</p>
                        )
                      }
                      <hr />
                      <p className="text-md pt-4 text-gray-700">
                        Deseja apagar a categoria "{deleteSelectedCategory?.name}" permanentemente?
                      </p>
                      <hr className="my-4" />
                      <button type="submit" className="mx-2 text-white h-10 hover:bg-red-700 bg-red-500 py-2 px-6 rounded cursor-pointer">
                        Apagar categoria
                      </button>
                    </form>
                  ),
                }[popup]
              }
            </div>
          </Outclick>
        </div>
      )
      }

      <AdminLayout>
        <div className="container mt-12 mx-auto">
          <span className="text-2xl text-barbina-brown mx-4 pr-2 add-product-title-underline">
            Categorias
          </span>
          <div className="flex mx-2">
            <button
              onClick={() => {
                setPopup("create-category");
              }} className="bg-green-600 ease-out duration-300 hover:bg-green-800 flex items-center gap-1 text-white py-1 mx-2 my-4 px-3 rounded cursor-pointer">
              Nova categoria
            </button>
            <button
              onClick={HandleLoadCategories}
              className="bg-yellow-500 hover:bg-yellow-700 flex items-center gap-1 text-white py-1 mx-2 my-4 px-3 rounded cursor-pointer">
              Atualizar
            </button>
          </div>
          {
            errors && errors.filter(error => error.showIn === "load").map(error =>
              <p key={error.message} className="bg-red-50 text-red-500 px-2 py-1 border-red-600 border rounded my-2">{error.message}</p>
            )
          }
          <hr />
          <div style={{ maxWidth: "950px" }} className="grid grid-cols-4 gap-4 mx-4 px-4 py-4">
            {
              loading ?
                <span className="col-span-4 w-full justify-center text-barbina-brown py-40 flex items-center text-xl gap-2">
                  Carregando <VscLoading className="rotate" />
                </span> :
                categories &&
                categories.map((category) => {
                  return (
                    <div key={category._id} className="col-span-4 sm:col-span-2 lg:col-span-1 border rounded shadow-lg bg-white p-2">
                      <h2 className="pb-2 px-2 text-xl text-gray-600">
                        {category.name}
                      </h2>
                      <hr />
                      <div className="pt-2">
                        <div className="inline-block mx-2">
                          <button
                            onClick={() => {
                              setEditSelectedCategory(category);
                              setPopup("edit-category");
                            }}
                            className="bg-yellow-500 mb-2 hover:bg-yellow-700 flex items-center gap-1 text-white py-1 text-sm px-3 rounded cursor-pointer">
                            <BiPencil /> Editar
                          </button>
                        </div>
                        <div className="inline-block mx-2">
                          <button
                            onClick={() => {
                              setDeleteSelectedCategory(category);
                              setPopup("delete-category");
                            }}
                            className=" bg-red-500 hover:bg-red-700 flex items-center gap-1 text-white py-1 text-sm px-3 rounded cursor-pointer">
                            <BiTrash /> apagar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Index
