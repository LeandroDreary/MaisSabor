import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

// pages
import Home from "./pages/Home";
import Contato from "./pages/Contato";

// Admin area pages
import Admin from "./pages/Admin/Home";
import AdminAddProduct from "./pages/Admin/Products/Create";
import AdminEditProduct from "./pages/Admin/Products/Edit";
import AdminProducts from "./pages/Admin/Products";
import AdminCategories from "./pages/Admin/Categories";
import { AdminAuth } from "./middlewares/AdminAuth";


const Index = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Contato />} path="/contato" />


          <Route element={<AdminAuth children={<AdminAddProduct />} />} path="/admin/products/add" />
          <Route element={<AdminAuth children={<AdminEditProduct />} />} path="/admin/products/edit/:id" />
          <Route element={<AdminAuth children={<AdminCategories />} />} path="/admin/categories" />
          <Route element={<AdminAuth children={<AdminProducts />} />} path="/admin/products" />
          <Route element={<AdminAuth children={<Admin />} />} path="/admin" />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
};

export default Index;