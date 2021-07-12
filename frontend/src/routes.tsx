import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
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

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route component={Home} path="/" exact />
        <Route component={Contato} path="/contato" />

        <Switch>
          <Route component={AdminAddProduct} path="/admin/products/add" />
          <Route component={AdminEditProduct} path="/admin/products/edit/:id" />
          <Route component={AdminCategories} path="/admin/categories" />
          <Route component={AdminProducts} path="/admin/products" />
          <Route component={Admin} path="/admin" />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default Routes;
