import React from "react";
import { ProductType } from "../Forms/Product/CreateOrEdit";

const Card = ({ product, children }: { product: ProductType, children?: any }) => {
  return (
    <div
      style={{
        borderRadius: "25px",
        borderBottomRightRadius: "0px",
        boxShadow: "0 10px 0 #facc3a"
      }}
      className="col-span-4 w-full transform hover-z-70 mx-auto duration-300 ease-out bg-white hover:scale-110 shadow-lg sm:col-span-2 lg:col-span-1 border border-gray-50 mt-5">
      <img style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }} className="w-full h-36 object-cover"
        src={product.image || "https://tpaempreendimentos.com.br/blog/wp-content/uploads/2019/02/shutterstock-84904912-1024x683.jpg"}
        alt={product.name} />
        <hr />

      <div className="px-2 py-1">
        <h3 className="text-barbina-brown text-2xl font-ubuntu">
          {product.name}
        </h3>
        <p className="text-barbina-light-brown pt-2 pb-4 text-gray-500">
          {product.description}
        </p>
        <hr className="border-barbina-brown" />
        <div className="text-barbina-brown font-bold pb-2 px-2 pt-3">
          <span className="text-2xl font-ubuntu">
            R${product.price?.toFixed(2).toString().split(".")[0]}
          </span>
          <span className="text-sm font-ubuntu">
            ,{product.price?.toFixed(2).toString().split(".")[1]}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export { Card };
