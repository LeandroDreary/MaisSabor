import React, { FormEvent, useEffect, useState } from "react";
import "./index.css"

import api, { authorization } from "../../../services/api";

import { Link } from "react-router-dom";
import { ProductCard } from "../../../components/Pages/ProductCard";
import Outclick from "../../../components/Utils/Outclick";

import { CategoryType } from "../../../components/Forms/Category/CreateOrEdit";
import { ProductType } from "../../../components/Forms/Product/CreateOrEdit";
import AdminLayout from "../../../layout/AdminLayout";

import { IoMdSad, VscLoading, BiPencil, BiTrash, BiError } from "react-icons/all";

const Index = () => {
  // The popup selected to show in the screen 
  const [popup, setPopup] = useState<"" | "delete-product">("");

  const [products, setProducts] = useState<{ state: "initial" | "loading" | "success" | "error", data: ProductType[] }>({ state: "initial", data: [] });
  const [categories, setCategories] = useState<{ state: "initial" | "loading" | "success" | "error", data: CategoryType[] }>({ state: "initial", data: [] });

  const [deleteSelectedProduct, setDeleteSelectedProduct] = useState<ProductType>();

  // Search filter
  const [filters, setFilters] = useState<{ category?: string, search?: string }>()

  // Store ocurred errors when send data to api 
  const [errors, setErrors] = useState<{ code?: string, message: string, showIn: string }[]>();

  const HandleLoadProducts = async () => {
    setProducts({ state: "loading", data: [] })

    var params = new URLSearchParams();

    if (filters?.category) params.append("category", filters.category)
    if (filters?.search) params.append("search", filters.search)

    // Get the products in the database
    await api.get("/products/list", { params }).then(response => {
      setProducts({ state: "success", data: response.data.products })
    }).catch(err => {
      setProducts({ state: "error", data: [] })
      throw err
    })
  };

  const HandleLoadCategories = async () => {
    // Getting the categories in the database
    await api.get("/categories/list").then(response => {
      setCategories(response.data.categories)
    }).catch(err => {
      console.error(err)
      if (err?.response?.data?.message)
        setErrors([{ ...err.response.data, showIn: "load" }])
      else
        setErrors([{ message: "Ocorreu um erro desconhecido ao carregar categorias.", showIn: "load" }])
    })
  };


  const HandleDeleteProduct = async (e: FormEvent) => {
    e.preventDefault();
    await api.delete(`/products`, { params: { _id: deleteSelectedProduct?._id }, headers: { authorization } }).then(() => {
      HandleLoadProducts();
      setPopup("")
    }).catch(err => {
      console.error(err)
      if (err?.response?.data?.message)
        setErrors([{ ...err.response.data, showIn: "delete" }])
      else
        setErrors([{ message: "Ocorreu um erro desconhecido.", showIn: "delete" }])
    })
  };

  useEffect(() => {
    HandleLoadProducts()
    HandleLoadCategories();
  }, []);


  return (
    <>
      {popup !== "" && (
        <div style={{ zIndex: 80 }} className="fixed flex items-center justify-center top-0 left-0 h-screen w-screen bg-black bg-opacity-70">
          <Outclick callback={() => {
            setPopup("");
            setDeleteSelectedProduct(undefined);
            setErrors([])
          }}>
            <div>
              {
                {
                  "": <></>,
                  "delete-product": (
                    <form data-aos="fade-down" data-aos-duration="1000" className="bg-white p-8 rounded" onSubmit={HandleDeleteProduct}>
                      <h2 className="text-2xl font-semibold text-gray-700">
                        Apagar {deleteSelectedProduct?.name}
                      </h2>
                      {
                        errors &&
                        <div className="pb-2">
                          {errors.filter(error => error.showIn === 'delete').map(error =>
                            <p className="bg-red-50 text-red-500 px-2 py-1 border-red-600 border rounded my-2">{error.message}</p>
                          )}
                        </div>
                      }
                      <hr />
                      <p className="text-md pt-4 text-gray-700">
                        Deseja apagar o produto "{deleteSelectedProduct?.name}" permanentemente?
                      </p>
                      <hr className="my-4" />
                      <button className="mx-2 text-white h-10 hover:bg-red-700 bg-red-500 py-2 px-6 rounded cursor-pointer" type="submit">
                        Apagar {deleteSelectedProduct?.name}
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
            Produtos
          </span>
          <div className="flex mx-2">
            <Link to="/admin/products/add">
              <button className="bg-green-600 ease-out duration-300 hover:bg-green-800 flex items-center gap-1 text-white py-1 mx-2 my-4 px-3 rounded cursor-pointer">
                Novo Produto
              </button>
            </Link>
            <button
              onClick={() => HandleLoadProducts()}
              className="bg-yellow-500 ease-out duration-300 hover:bg-yellow-700 flex items-center gap-1 text-white py-1 mx-2 my-4 px-3 rounded cursor-pointer">
              Atualizar
            </button>
          </div>
          {errors &&
            <div className="pb-2">
              {errors.filter(error => error.showIn === 'load').map(error =>
                <p className="bg-red-50 text-red-500 px-2 py-1 border-red-600 border rounded my-2">{error.message}</p>
              )}
            </div>}
          <hr />
          <div className="mt-2 py-4 px-2 mx-2 pb-8 bg-white border rounded shadow-sm">
            <form onSubmit={e => { e.preventDefault(); HandleLoadProducts() }} className="flex mb-4">
              <button type="submit" className="mx-2 bg-yellow-400 duration-300 hover:bg-yellow-700 text-white h-10 py-2 px-6 rounded cursor-pointer">
                Procurar
              </button>
              <div className="w-40 h-10 p-1 flex border border-gray-200 rounded">
                <select onChange={e => setFilters({ category: e.target.value, search: filters?.search })} className="mx-2 text-gray-600 form-select w-full">
                  <option value="">Todas</option>
                  {categories.data?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full mx-2">
                <div className="p-1 flex border border-gray-200 rounded">
                  <input placeholder="Procurar" value={filters?.search} className="p-1 px-2 appearance-none outline-none w-full"
                    onChange={e => setFilters({ ...filters, search: e.target.value })} />
                </div>
              </div>
            </form>
            <hr />

            {products?.state === "loading" &&
              <span className="w-full text-barbina-brown py-40 flex items-center justify-center text-xl gap-2">
                Carregando <VscLoading className="animate-spin" />
              </span>}

            {products?.state === "error" &&
              <span className="w-full py-40 flex items-center justify-center text-xl gap-2 text-barbina-brown">Erro ao carregar produtos
                <BiError />
              </span>
            }
            {products?.state === "success" &&
              <>
                {products?.data.length === 0 &&
                  <span className="w-full justify-center text-barbina-brown py-40 flex items-center text-xl gap-2">
                    Sem resultados encontrados <IoMdSad />
                  </span>}


                <div className="grid sm:grid-cols-6 lg:grid-cols-5 gap-2 p-2">
                  {products?.data.map(product =>
                  (<ProductCard key={product._id} product={product}>
                    <hr className="border-barbina-light-brown" />
                    <div className="pt-2 flex items-center gap-1 mb-2">
                      <Link className="grow justify-center bg-yellow-500 ease-out duration-300 hover:bg-yellow-700 flex items-center gap-1 text-white py-1 text-sm rounded cursor-pointer" to={`/admin/products/edit/${product._id}`}>
                        <BiPencil /> Editar
                      </Link>
                      <button onClick={() => {
                        setDeleteSelectedProduct(product);
                        setPopup("delete-product");
                      }} className="grow justify-center bg-red-500 ease-out duration-300 hover:bg-red-700 flex items-center gap-1 text-white py-1 text-sm rounded cursor-pointer">
                        <BiTrash /> Apagar
                      </button>
                    </div>
                  </ProductCard>)
                  )}
                </div>
              </>
            }
          </div>

        </div>
      </AdminLayout>
    </>
  );
};

export default Index;
