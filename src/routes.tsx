import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Contato from "./pages/Contato";

// Admin area pages
import Admin from "./pages/Admin/Home";
import AdminAddProduct from "./pages/Admin/AddProduct";
import AdminCategories from "./pages/Admin/Categories";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Contato} path="/contato" />

      <Switch>
        <Route component={AdminAddProduct} path="/admin/add-product" />
        <Route component={AdminCategories} path="/admin/categories" />
        <Route component={Admin} path="/admin" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
