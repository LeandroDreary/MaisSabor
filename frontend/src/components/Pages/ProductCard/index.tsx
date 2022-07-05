import React from "react";

import { BiDish } from "react-icons/all"

import { ProductType } from "../../Forms/Product/CreateOrEdit";

const ProductCard = ({ product, children }: { product: ProductType, children?: any }) => {
  return (
    <div style={{ boxShadow: "0 10px 0 #facc3a" }} className="col-span-6 mc:col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-1 rounded-3xl w-48 max-w-full mx-auto rounded-br-none duration-300 ease-out bg-white mt-5 hover:scale-110 shadow-lg">
      {product.image ?
        <img className="w-full h-36 object-cover rounded-t-3xl" src={product.image} alt={product.name} />
        : <BiDish size="100" className="w-1/2 mx-auto text-barbina-dark-brown" />
      }
      <hr />

      <div className="px-2 py-1">
        <h3 className="text-2xl font-semibold text-barbina-dark-brown">
          {product.name}
        </h3>
        <p className="pt-2 pb-4 text-gray-500 font-thin">
          {product.description}
        </p>
        <hr />
        <div className="font-bold pb-2 px-2 pt-3 text-barbina-brown">
          <span className="text-2xl">
            R${product.price?.toFixed(2).toString().split(".")[0]}
          </span>
          <span className="text-sm">
            ,{product.price?.toFixed(2).toString().split(".")[1]}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export { ProductCard };
