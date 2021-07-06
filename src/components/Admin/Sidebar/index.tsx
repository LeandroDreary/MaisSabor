import React from "react";
import { Link } from "react-router-dom";
import { MdCreateNewFolder, BsListCheck } from "react-icons/all";
import Icon from "../../../assets/images/icon.png";

const index = () => {
  return (
    <>
      <div className="h-screen bg-yellow-500 w-60 p-4 shadow-lg rounded">
        <Link to={"/admin"}>
          <span>
            <img
              src={Icon}
              className="w-3/4 mx-auto z-40"
              alt="Icone Barbina"
            />
          </span>
        </Link>
        <hr className="border-black mt-8" />
        <div className="mt-6 px-2">
          <h3 className="font-semibold text-gray-900 my-3">
            <Link to={"/admin"}>Página Inicial</Link>
          </h3>
          <h3 className="font-semibold text-gray-900 my-3">produtos</h3>
          <div className="ml-1 text-sm pl-2 text-gray-800 border-l border-black">
            <div className="my-3 hover:text-gray-900">
              <Link className="flex items-center gap-2" to="/admin/add-product">
                <MdCreateNewFolder />
                Novo produto
              </Link>
            </div>
            <div className="my-3 hover:text-gray-900">
              <Link className="flex items-center gap-2" to="/admin/products">
                <BsListCheck />
                Listar produtos
              </Link>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 my-3">Categorias</h3>
          <div className="ml-1 text-sm pl-2 text-gray-800 border-l border-black">
            <div className="my-3 hover:text-gray-900">
              <Link className="flex items-center gap-2" to="/admin/categories">
                <BsListCheck />
                Listar categorias
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
