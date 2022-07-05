import React, { ReactNode } from "react";

import Sidebar from "../components/Pages/Admin/Sidebar";

const Index = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="max-h-screen overflow-auto grow">{children}</div>
    </div>
  );
};

export default Index;
