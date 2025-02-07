import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./productSkeleton";
import { Box, Stack, Slider, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import fetchData from "../../Utils/fetchData";
import { useParams } from "react-router-dom";

const marks = [
  {
    value: 0,
    label: "$0",
  },
  {
    value: 500,
    label: "$500",
  },
];

function valuetext(value) {
  return `$${value}`;
}

export default function Product() {
  const [products, setProducts] = useState();
  const [price, setPrice] = useState([0, 500]);
  const [sort, setSort] = useState("createdAt:desc");
  const { categoryId } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `products?populate=*&categoryId&sort=${sort}&${
          categoryId == "all" ? "" : `filters[categories][id][$eq]=${categoryId}&`
        }&filters[price][$gte]=${price[0]}&filters[price][$lte]=${price[1]}`
      );
      setProducts(response.data);
    })();
  }, [categoryId,price, sort]);

  const productItems = products?.map((e, index) => (
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
    <Box
      sx={{
        display: "flex",
        gap: "50px",
        flexWrap: "wrap",
        justifyContent: "",
        padding: "3% 4%",
      }}
    >
      <Stack
        sx={{
          height:'550px',
          padding: "1% 1%",
          borderRadius: "50px",
          backgroundColor: "#BE3144",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "24px", padding: "4%" }}>
          Filters
        </Typography>
        <Box
          sx={{
            minWidth: 120,
            backgroundColor: "#fff2ce",
            borderRadius: "40px",
            padding: "4% 6%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Sorting :</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={sort}
              label="Category"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value={"createdAt:desc"}>New Products</MenuItem>
              <MenuItem value={"createdAt:asc"}>Last Products</MenuItem>
              <MenuItem value={"price:desc"}>Highest Price</MenuItem>
              <MenuItem value={"title:asc"}>Lowest Price</MenuItem>
              <MenuItem value={"price:asc"}>A to Z</MenuItem>
              <MenuItem value={"title:desc"}>Z to A</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ padding: "10% 0" }}>
          <Box
            sx={{
              backgroundColor: "#fff2ce",
              borderRadius: "40px",
              width: "350px",
              padding: "4% 12%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Slider
              value={price}
              min={0}
              max={500}
              onChange={(e) => setPrice(e.target.value)}
              valueLabelDisplay="auto"
              valueLabelFormat={valuetext}
              marks={marks}
            />
          </Box>
        </Box>
      </Stack>
      {products ? productItems : <ProductSkeleton />}
    </Box>
  );
}
