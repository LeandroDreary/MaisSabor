import React, { FormEvent, useState } from "react";

import api, { authorization } from "../../../services/api";

import Warning, { WarningType } from "../../Utils/Warning";

import AOS from "aos";
AOS.init();

export type CategoryType = {
  _id: string;
  name: string;
};

type CreateOrEditCategoryProps = {
  datas: {
    category?: CategoryType;
  };
  callBack?: () => any;
};

const Index = ({ datas, callBack }: CreateOrEditCategoryProps) => {

  // Store ocurred errors when send data to api 
  const [errors, setErrors] = useState<{ code?: string, message: string, showIn: string }[]>();
  // Warnings in the form inputs
  const [warnings, setWarnings] = useState<WarningType[]>();
  // form state
  const [loading, setLoading] = useState<boolean>(false);


  // form inputs
  const [name, setName] = useState<string>(datas.category?.name ?? "");


  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true)

    try {
      const myWarnings: WarningType[] = [];

      // filter datas
      if (name.length < 3)
        myWarnings.push({
          input: "name",
          message: "Nome deve ter no mínimo 3 caracteres.",
          type: "warning",
        });

      setWarnings(myWarnings);

      if (myWarnings.length > 0) return;


      // If it's going to update or create a category
      if (!datas.category?._id) {
        // Create category
        await api.post("/categories", { name }, { headers: { authorization } }).then(() => callBack && callBack()).catch(error => {
          console.error(error.response.data)
          if (error.response.data.message)
            setErrors([{ ...error.response.data, showIn: "sendForm" }])
          else {
            setErrors([{ message: "Ocorreu um erro desconhecido.", showIn: "sendForm" }])
          }
        })
      } else {
        // Update category
        await api.put("/categories", { _id: datas.category?._id, name }, { headers: { authorization } }).then(() =>
          callBack && callBack()
        ).catch(error => {
          if (error.response.data.message)
            setErrors([{ ...error.response.data, showIn: "sendForm" }])
          else
            setErrors([{ message: "Ocorreu um erro desconhecido.", showIn: "sendForm" }])
        })
      }

    } finally {
      setLoading(false)
    }
  };

  return (
    <form
      data-aos="fade-down"
      data-aos-duration="500"
      className="bg-white p-8 rounded w-screen"
      onSubmit={HandleSubmit}
      style={{ maxWidth: "400px" }}
    >
      <h2 className="text-2xl my-2 font-semibold text-gray-700">
        {datas.category?._id ? "Editar categoria" : "Nova categoria"}
      </h2>
      {
        errors &&
        <div className="pb-2">
          {errors.filter(error => error.showIn === 'sendForm').map(error =>
            <p className="zoom-init-anim bg-red-50 text-red-500 px-2 py-1 border-red-600 border rounded my-2">{error.message}</p>
          )}
        </div>
      }
      <hr />
      <div className="w-full py-4 my-2">
        <label htmlFor="name" className="text-gray-500">
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
        <div>
          <Warning datas={{ warnings, input: "name" }} />
        </div>
      </div>
      <hr className="my-4" />
      <button
        style={{ background: "rgb(237, 201, 0)" }}
        className="mx-2 filter hover:brightness-50 text-white h-10 py-2 px-6 rounded cursor-pointer"
        type="submit"
      >
        {datas.category?._id ? "Editar categoria" : "Criar categoria"}
      </button>
    </form>
  );
};

export default Index;
