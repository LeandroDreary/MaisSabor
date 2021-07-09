import React, { FormEvent, useState } from "react";
import { db } from "../../../services/firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import Warning, { WarningType } from "../../Warning";
AOS.init();

export type CategoryType = {
  id: string;
  name: string;
};

type CreateOrEditCategoryProps = {
  datas: {
    catgory?: CategoryType;
  };
  callBack?: ({
    categoryDoc,
    warnings,
  }: {
    categoryDoc?: CategoryType;
    warnings?: WarningType[];
  }) => any;
};

const Index = ({ datas, callBack }: CreateOrEditCategoryProps) => {
  const [warnings, setWarnings] = useState<WarningType[]>();

  // form inputs
  const [name, setName] = useState<string>(datas.catgory?.name ?? "");

  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const myWarnings: WarningType[] = [];

    // filter datas
    if (name.length < 3)
      myWarnings.push({
        input: "name",
        message: "Nome deve ter no mínimo 3 caracteres.",
        type: "warning",
      });

    if (myWarnings.length > 0) {
      setWarnings(myWarnings);
      return;
    }

    try {
      // If it's going to update or create a category
      if (!datas.catgory?.id) {
        // Create category
        await db
          .collection("categories")
          .add({
            name,
          })
          .then(() =>
            myWarnings.push({
              input: "",
              message: "Categoria adicionada com sucesso!",
              type: "success",
            })
          )
          .catch((error) => {
            myWarnings.push({
              input: "",
              message: "Erro ao criar categoria.",
              type: "error",
            });
            throw new Error(error);
          });
      } else {
        // Update category
        await db
          .collection("categories")
          .doc(datas.catgory?.id)
          .update({ name })
          .then(() =>
            myWarnings.push({
              input: "",
              message: "Categoria editada com sucesso!",
              type: "success",
            })
          )
          .catch((error) => {
            myWarnings.push({
              input: "",
              message: "Erro ao editar categoria.",
              type: "error",
            });
            throw new Error(error);
          });
      }
    } catch (error) {
      myWarnings.push({
        input: "",
        message: `Algo deu errado. Erro: ${error}`,
        type: "error",
      });
      console.error("Something went wrong: ", error);
    }

    setWarnings(myWarnings);

    myWarnings.filter((myWarning) => myWarning.type === "error").length <= 0 &&
      callBack &&
      callBack({ warnings: myWarnings });
    return;
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
        {datas.catgory?.id ? "Editar categoria" : "Nova categoria"}
      </h2>
      <Warning datas={{ warnings, input: "" }} />
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
        {datas.catgory?.id ? "Editar categoria" : "Criar categoria"}
      </button>
    </form>
  );
};

export default Index;
