import React from "react";
import { Card, CardContent, Box, Skeleton, IconButton, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ProductDetailsSkeleton = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#fff2ce",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "2% 20%",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        sx={{
          height: 500,
          width: "100%",
          borderRadius: "16px",
          objectFit: "contain",
        }}
      />
      <CardContent sx={{ width: "100%" }}>
        {/* Title Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: "60%", marginBottom: 2 }} />
        
        {/* Description Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%", marginBottom: 2 }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%", marginBottom: 2 }} />

        {/* Categories Skeleton */}
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginBottom: 1 }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "50%" }} />
        </Box>

        {/* Price Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "30%", marginBottom: 2 }} />

        {/* Quantity Skeleton */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "20%" }} />
          <IconButton
            sx={{
              backgroundColor: "#E17564",
              color: "white",
              "&:hover": {
                backgroundColor: "#D16458",
              },
              width: "40px",
              height: "40px",
            }}
          >
            <Remove />
          </IconButton>
          <Skeleton
            variant="rectangular"
            sx={{
              width: "60px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          />
          <IconButton
            sx={{
              backgroundColor: "#E17564",
              color: "white",
              "&:hover": {
                backgroundColor: "#D16458",
              },
              width: "40px",
              height: "40px",
            }}
          >
            <Add />
          </IconButton>
        </Box>

        {/* Button Skeleton */}
        <Skeleton
          variant="rectangular"
          sx={{
            height: "50px",
            width: "100%",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProductDetailsSkeleton;
