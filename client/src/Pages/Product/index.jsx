import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import fetchData from "../../Utils/fetchData";
import { Box, Stack } from "@mui/material";
import ProductSkeleton from "./productSkeleton";

export default function Product() {
  const [product, setProduct] = useState();
  useEffect(() => {
    (async () => {
      const respone = await fetchData("products?populate=*");
      setProduct(respone.data);
    })();
  }, []);
  const productItems = product?.map((e, index) => (
    <ProductCard
      key={index}
      id={e.id}
      title={e.title}
      description={e.description}
      price={e.price}
      image={import.meta.env.VITE_BASE_URL + e.image[0].url}
      category={e.categories}
    />
  ));
  return (
    <>
      {product ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            padding: "3% 2%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {productItems}
        </Box>
      ) : (
        <ProductSkeleton />
      )}
      1
    </>
  );
}
