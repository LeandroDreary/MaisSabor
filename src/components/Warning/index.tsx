import React from "react";

// types
export type WarningType = {
  type: "error" | "success" | "warning" | "";
  message: string;
  input: string;
};

type WarningProps = {
  datas: {
    warnings?: WarningType[];
    input: string;
  };
};

const Index = ({ datas }: WarningProps) => {
  return (
    <div>
      {datas.warnings &&
        datas.warnings.map((warning) => {
          if (warning.input === datas.input) {
            switch (warning.type) {
              case "error":
                return (
                  <div key={`${warning.message}_${warning.type}`} className="zoom-init-anim bg-red-50 rounded my-2 text-sm border border-red-600 text-red-600 w-full py-2 px-4">
                    {warning.message}
                  </div>
                );
              case "success":
                return (
                  <div key={`${warning.message}_${warning.type}`} className="zoom-init-anim bg-green-50 rounded my-2 text-sm border border-green-600 text-green-600 w-full py-2 px-4">
                    {warning.message}
                  </div>
                );
              case "warning":
                return (
                  <div key={`${warning.message}_${warning.type}`} className="zoom-init-anim bg-yellow-50 rounded mt-2 text-sm border border-yellow-600 text-yellow-600 w-full py-2 px-4">
                    {warning.message}
                  </div>
                );
            }
          }
          return <span key={Math.random()}></span>;
        })}
    </div>
  );
};

export default Index;
