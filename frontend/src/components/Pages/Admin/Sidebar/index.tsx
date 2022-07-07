import { Link } from "react-router-dom";

import { MdCreateNewFolder } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";

import Icon from "./../../../../assets/images/icon.png";
const index = () => {
  return (
    <>
      <div className="h-screen bg-yellow-500 w-60 p-4 shadow-lg">
        <Link to={"/admin"}>
          <span>
            <img src={Icon} className="w-3/4 mx-auto z-40" alt="Icone Barbina" />
          </span>
        </Link>
        <hr className="border-black mt-8" />
        <div className="mt-6 px-2">
          <h3 className="font-semibold text-barbina-brown my-3">
            <Link to={"/admin"}>Página Inicial</Link>
          </h3>
          <h3 className="font-semibold text-barbina-brown my-3">Produtos</h3>
          <div className="ml-1 text-sm pl-2 border-l text-barbina-light-brown border-black">
            <div className="my-3 duration-300 hover:text-barbina-brown">
              <Link className="flex items-center gap-2" to="/admin/products">
                <BsListCheck />
                Listar produtos
              </Link>
            </div>
            <div className="my-3 duration-300 hover:text-barbina-brown">
              <Link className="flex items-center gap-2" to="/admin/products/add">
                <MdCreateNewFolder />
                Novo produto
              </Link>
            </div>
          </div>
          <h3 className="font-semibold text-barbina-brown my-3">Categorias</h3>
          <div className="ml-1 text-sm pl-2 text-barbina-light-brown border-l border-black">
            <div className="my-3 duration-300 hover:text-barbina-brown">
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
