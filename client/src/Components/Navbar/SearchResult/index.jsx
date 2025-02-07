import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchResult({ img, title, type, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(
      `${
        type == "category" ? "products" : "product-details"
      }/${id}/${title.replaceAll(" ", "-")}`
    );
  };
  return (
    <Stack
      onClick={handleClick}
      flexDirection={"row"}
      padding={'0 15px'}
      gap={'15px'}
      alignItems={"center"}
      sx={{cursor:'pointer',marginBottom:'10px'}}
    >
      <Box
        component={"img"}
        height={"60px"}
        width={"60px"}
        borderRadius={"5px"}
        sx={{ objectFit: "cover" }}
        src={import.meta.env.VITE_BASE_URL + img}
        alt=""
      />
      <Typography variant="body2">{title}</Typography>
    </Stack>
  );
}

