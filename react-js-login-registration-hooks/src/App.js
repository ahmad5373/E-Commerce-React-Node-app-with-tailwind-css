import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Update from "./components/UpdateUser";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Notfound from "./components/NotFound";
import AddProduct from "./components/AddProduct";
import ProductDescription from "./components/productDescription";
import CheckOut from "./components/CheckOut";
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path={"/"} element={<Home />}></Route>
        <Route exact path={"/products"} element={<Home />}></Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/AddProduct" element={<AddProduct />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/products/:id" element={<ProductDescription />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        {/* 404 route */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
