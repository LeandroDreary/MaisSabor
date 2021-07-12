import React, { FormEvent, useState } from "react";
import { useEffect } from "react";
import CreateOrEditCategory, { CategoryType } from "../../../components/Forms/Category/CreateOrEdit";
import Outclick from "../../../components/Outclick";
import { db } from "../../../services/firebase";
import { BiTrash, BiPencil } from "react-icons/all";
import "./index.css";
import AdminLayout from "../../../layout/AdminLayout";

const Index = () => {
  // The popup selected to show in the screen 
  const [popup, setPopup] = useState<"" | "create-category" | "edit-category" | "delete-category">("");

  const [categories, setCategories] = useState<CategoryType[]>([]);

  // Variable to store the category that will be edited
  const [editSelectedCategory, setEditSelectedCategory] = useState<CategoryType>();

  // Variable to store the category that will be deleted
  const [deleteSelectedCategory, setDeleteSelectedCategory] = useState<CategoryType>();

  const HandleLoadCategories = async () => {

    // Getting the categories in the database
    await db.collection("categories").get().then(querySnapshot => {
      let myCategories: CategoryType[] = [];
      querySnapshot.forEach((doc) => myCategories.push({ id: doc.id, name: doc.data().name }));
      setCategories(myCategories);
    });
  };

  const HandleDeleteCategory = async (e: FormEvent) => {
    e.preventDefault();

    let categoryDocRef = db.collection("categories").doc(deleteSelectedCategory?.id);

    db.runTransaction((transaction) => transaction.get(categoryDocRef).then((categoryDoc) => {
      // Verify if the category exist
      if (!categoryDoc.exists) throw new Error("Document does not exist!");
      // Deleting the category
      transaction.delete(categoryDocRef);
    })).then(() => {
      HandleLoadCategories();
      setPopup("");
    }).catch(error => {
      console.log("Transaction failed: ", error);
    });
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
                      datas={{ catgory: editSelectedCategory }}
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
                      <hr />
                      <p className="text-md pt-4 text-gray-700">
                        Deseja apagar a categoria "
                        {deleteSelectedCategory?.name}" permanentemente?
                      </p>
                      <hr className="my-4" />
                      <button
                        className="mx-2 text-white h-10 hover:bg-red-700 bg-red-500 py-2 px-6 rounded cursor-pointer"
                        type="submit"
                      >
                        Apagar categoria
                      </button>
                    </form>
                  ),
                }[popup]
              }
            </div>
          </Outclick>
        </div>
      )}

      <AdminLayout>
        <div className="container mt-12 mx-auto">
          <span className="text-2xl text-barbina-brown mx-4 pr-2 add-product-title-underline">
            Categorias
          </span>
          <div className="flex mx-2">
            <button
              onClick={() => {
                setPopup("create-category");
              }}
              className="bg-yellow-500 hover:bg-yellow-700 flex items-center gap-1 text-white py-1 mx-2 my-4 px-3 rounded cursor-pointer"
            >
              Nova categoria
            </button>
            <button
              onClick={HandleLoadCategories}
              className="bg-yellow-500 hover:bg-yellow-700 flex items-center gap-1 text-white py-1 mx-2 my-4 px-3 rounded cursor-pointer"
            >
              Atualizar
            </button>
          </div>
          <hr />
          <div
            style={{ maxWidth: "950px" }}
            className="grid grid-cols-4 gap-4 mx-4 px-4 py-4"
          >
            {categories &&
              categories.map((category) => {
                return (
                  <div
                    key={category.id}
                    className="col-span-4 sm:col-span-2 lg:col-span-1 border rounded shadow-lg bg-white p-2"
                  >
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
                          className="bg-yellow-500 mb-2 hover:bg-yellow-700 flex items-center gap-1 text-white py-1 text-sm px-3 rounded cursor-pointer"
                        >
                          <BiPencil /> Editar
                        </button>
                      </div>
                      <div className="inline-block mx-2">
                        <button
                          onClick={() => {
                            setDeleteSelectedCategory(category);
                            setPopup("delete-category");
                          }}
                          className=" bg-red-500 hover:bg-red-700 flex items-center gap-1 text-white py-1 text-sm px-3 rounded cursor-pointer"
                        >
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

export default Index;
