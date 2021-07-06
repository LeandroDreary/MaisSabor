import React from "react";

const Card = () => {
  return (
    <div
      style={{
        borderRadius: "25px",
        borderBottomRightRadius: "0px",
        boxShadow: "0 10px 0 #facc3a",
      }}
      className="col-span-4 transform hover-z-70 duration-300 ease-out bg-white hover:scale-110 shadow-lg sm:col-span-2 lg:col-span-1 border border-gray-200 mt-5"
    >
      <img
        style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }}
        className="w-full"
        src="https://tpaempreendimentos.com.br/blog/wp-content/uploads/2019/02/shutterstock-84904912-1024x683.jpg"
        alt=""
      />
      <div className="px-3 py-1">
        <h3
          // style={{ color: "rgb(240, 172, 0)" }}
          className="text-2xl text-gray-700 font-ubuntu"
        >
          Frango bovino
        </h3>
        <p className="pt-2 pb-4 text-gray-500">
          Ruby red with purple hues, golden with green tones, and pale straw
          with hints of silver.
        </p>
        <hr />
        <div
        //   style={{ color: "rgb(240, 172, 0)" }}
          className="font-bold text-gray-700 pb-2 pt-3"
        >
          <span className="text-2xl font-ubuntu">R$50</span>
          <span className="text-sm font-ubuntu">,90</span>
        </div>
      </div>
    </div>
  );
};

export { Card };
