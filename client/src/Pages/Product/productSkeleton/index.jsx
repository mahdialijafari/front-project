import React from "react";
import { Card, CardContent, CardActions, Box, Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#fff2ce",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "400px",
        height: "550px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "20px",
      }}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        sx={{
          height: 180,
          width: "100%",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      />
      <CardContent>
        {/* Title Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "1.5rem", marginBottom: 1, width: "70%" }} />
        
        {/* Description Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "1rem", marginBottom: 2, width: "90%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", marginBottom: 2, width: "80%" }} />
        
        {/* Categories Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "1rem", marginBottom: 2, width: "50%" }} />
        
        {/* Price Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "1.25rem", marginBottom: 1, width: "30%" }} />
      </CardContent>
      <CardActions sx={{ justifyContent: "center", padding: 2, marginTop: "auto" }}>
        {/* Button Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            width: "120px",
            height: "40px",
            borderRadius: "8px",
          }}
        />
      </CardActions>
    </Card>
  );
};

const ProductSkeleton = () => {
  const skeletonArray = Array.from({ length: 8 }); // Adjust the number for more/less skeletons

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      {skeletonArray.map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </Box>
  );
};

export default ProductSkeleton;
