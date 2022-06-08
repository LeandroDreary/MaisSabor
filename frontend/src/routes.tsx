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


const Index = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Contato />} path="/contato" />
          <Route element={<AdminAddProduct />} path="/admin/products/add" />
          <Route element={<AdminEditProduct />} path="/admin/products/edit/:id" />
          <Route element={<AdminCategories />} path="/admin/categories" />
          <Route element={<AdminProducts />} path="/admin/products" />
          <Route element={<Admin />} path="/admin" />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
};

export default Index;