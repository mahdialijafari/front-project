import React from "react";
import {
  Profile,
  Product,
  ProductDetails,
  About,
  Auth,
  Home,
  NotFound,
  Cart,
  Blog,
} from "./Pages";
import { Navbar, Footer } from "./Components";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
export default function App() {
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box component={"main"} minHeight={"80vh"}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog/>} />
          <Route
            path="/products/:categoryId/:categoryName"
            element={<Product />}
          />
          
          <Route
            path="/product-details/:id/:title"
            element={<ProductDetails />}
          />
          <Route
            path="/auth"
            element={token ? <Navigate to={"/profile"} /> : <Auth />}
          />
          <Route
            path="/profile"
            element={!token ? <Navigate to={"/auth"} /> : <Profile />}
          />
          <Route
            path="/cart"
            element={!token ? <Navigate to={"/auth"} /> : <Cart />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
      <Toaster/>
    </>
  );
}
