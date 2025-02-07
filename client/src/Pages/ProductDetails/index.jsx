import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
  TextField,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import fetchData from "../../Utils/fetchData";
import ProductDetailsSkeleton from "./productDetailsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Store/Slices/CartSlice";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const {token}=useSelector((state)=>state.auth)
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `products?populate=*&filters[id][$eq]=${id}`
      );
      setProduct(response.data[0]);
    })();
  }, [id]);

  const productQuantity = useSelector((state) => state.cart.items)?.filter(
    (e) => e.id == id
  )[0]?.cartQuantity;
  const dispatch = useDispatch();

  return (
    <>
      {product ? (
        <Card
          sx={{
            backgroundColor: "#fff2ce",
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            margin: {sx:"1% 2%",lg:"2% 20%"},
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <CardMedia
            component="img"
            image={import.meta.env.VITE_BASE_URL + product?.image[0]?.url}
            alt={product?.title}
            sx={{
              height: 500,
              objectFit: "cover",
              borderRadius: "16px",
              objectFit: "contain",
              width: "100%",
            }}
          />
          <CardContent>
            <Typography
              variant="h4"
              sx={{ color: "#E17564", fontWeight: "bold", marginBottom: 2 }}
            >
              {product?.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#4A4A4A", marginBottom: 2 }}
            >
              {product?.description}
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#E17564", fontWeight: "600" }}
              >
                Category:
              </Typography>
              <Typography variant="body2" sx={{ color: "#4A4A4A" }}>
                {product?.categories[1]?.title?`${product?.categories[0]?.title} and ${product?.categories[1]?.title}`:product?.categories[0]?.title} 
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{ color: "#E17564", fontWeight: "bold", marginBottom: 2 }}
            >
              Price: ${product?.price}
            </Typography>
            <Typography variant="body1" sx={{ color: "#4A4A4A" }}>
              Quantity: {product?.quantity}
            </Typography>
            {productQuantity ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginBottom: 2,
                  marginTop: 2,
                }}
              >
                <IconButton
                  onClick={() => dispatch(removeFromCart(product.id))}
                  sx={{
                    backgroundColor: "#E17564",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#D16458",
                    },
                  }}
                >
                  <Remove />
                </IconButton>
                <Typography>{productQuantity}</Typography>

                <IconButton
                  disabled={productQuantity >= product.quantity}
                  onClick={() => dispatch(addToCart(product))}
                  sx={{
                    backgroundColor: "#E17564",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#D16458",
                    },
                  }}
                >
                  <Add />
                </IconButton>
              </Box>
            ) : (
              <Button
                disabled={productQuantity >= product.quantity}
                onClick={() => dispatch(addToCart(product))}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#E17564",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#D16458",
                  },
                  borderRadius: "8px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                Add to Cart
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <ProductDetailsSkeleton />
      )}
    </>
  );
};

export default ProductDetails;
