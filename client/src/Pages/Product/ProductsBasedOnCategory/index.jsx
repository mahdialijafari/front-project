
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import { Box, Typography, Grid } from "@mui/material";

export default function ProductsBasedOnCategory() {
  const { categoryId, categoryTitle } = useParams(); // Extract params from the URL
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Fetch products by category ID (assuming the API supports this)
    const fetchCategoryProducts = async () => {
      const response = await fetchData(`products?category=${categoryId}`);
      setCategoryProducts(response.data);
    };
    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        {categoryTitle} Products
      </Typography>
      <Grid container spacing={2}>
        {categoryProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box sx={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "auto" }} />
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
