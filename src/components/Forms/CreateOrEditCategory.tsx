import React, { FormEvent, useState } from "react";
import { db } from "../../services/firebase";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

type WarningType = {
  type: "error" | "success" | "warning" | "";
  message: string;
  input: string;
};

type CategoryType = {
  name: string;
  id: string;
};

const Index = ({
  data,
  Submit,
}: {
  data?: CategoryType;
  Submit?: (docRef?: any) => any;
}) => {
  const [name, setName] = useState<string>(data?.name ?? "");

  const [warnings, setWarnings] = useState<WarningType[]>();

  const HandleSubmit = (e: FormEvent) => {
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

    // If it's going to update or create a category
    if (!data?.id) {
      // Create category
      db.collection("categories")
        .add({
          name,
        })
        .then((docRef) => {
          if (Submit) Submit(docRef);
        })
        .catch((error) => {
          myWarnings.push({
            input: "",
            message: `Erro ao criar categoria: ${error}` ,
            type: "error",
          });
          console.error("Error adding document: ", error);
        });
    } else {
      // Update category
      const categoryDocRef = db.collection("categories").doc(data?.id);

      db.runTransaction((transaction) => {
        return transaction.get(categoryDocRef).then((categoryDoc) => {
          if (!categoryDoc.exists) {
            myWarnings.push({
              input: "",
              message: "Categoria não encontrada.",
              type: "error",
            });
            throw new Error("Document does not exist!");
          }
          transaction.update(categoryDocRef, { name });
        });
      })
        .then(() => {
          if (Submit) Submit();
        })
        .catch((error) => {
          myWarnings.push({
            input: "",
            message: `Erro ao editar categoria: ${error}` ,
            type: "error",
          });
          console.log("Transaction failed: ", error);
        });
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
        {data?.id ? "Editar categoria" : "Nova categoria"}
      </h2>
      {warnings &&
        warnings.map((warning) => {
          if (warning.input === "") {
            switch (warning.type) {
              case "error":
                return (
                  <div className="bg-red-50 rounded my-2 text-sm border border-red-600 text-red-600 w-full py-2 px-4">
                    {warning.message}
                  </div>
                );
              case "success":
                return (
                  <div className="bg-green-50 rounded my-2 text-sm border border-green-600 text-green-600 w-full py-2 px-4">
                    {warning.message}
                  </div>
                );
              case "warning":
                return (
                  <div className="bg-yellow-50 rounded mt-2 text-sm border border-yellow-600 text-yellow-600 w-full py-2 px-4">
                    {warning.message}
                  </div>
                );
            }
          }
          return <></>;
        })}
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
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        <div>
          {warnings &&
            warnings.map((warning) => {
              if (warning.input === "name") {
                switch (warning.type) {
                  case "error":
                    return (
                      <div className="bg-red-50 rounded my-2 text-sm border border-red-600 text-red-600 w-full py-2 px-4">
                        {warning.message}
                      </div>
                    );
                  case "success":
                    return (
                      <div className="bg-green-50 rounded my-2 text-sm border border-green-600 text-green-600 w-full py-2 px-4">
                        {warning.message}
                      </div>
                    );
                  case "warning":
                    return (
                      <div className="bg-yellow-50 rounded mt-2 text-sm border border-yellow-600 text-yellow-600 w-full py-2 px-4">
                        {warning.message}
                      </div>
                    );
                }
              }
              return <></>;
            })}
        </div>
      </div>
      <hr className="my-4" />
      <button
        style={{ background: "rgb(237, 201, 0)" }}
        className="mx-2 filter hover:brightness-50 text-white h-10 py-2 px-6 rounded cursor-pointer"
        type="submit"
      >
        {data?.id ? "Editar categoria" : "Criar categoria"}
      </button>
    </form>
  );
};

export default Index;
