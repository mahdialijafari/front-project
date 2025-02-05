import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Add, Delete, Remove } from "@mui/icons-material"; // For delete icon
import { addToCart, clear, removeFromCart } from "../../Store/Slices/CartSlice";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  // Get cart items and total price from the Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  return (
    <>
      {cartItems.length>0?<Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(45deg, #872341, #E17564)", // Gradient background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          padding: "40px",
          backgroundColor: "#fff2ce", // Light gold background for the cart
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              color: "#DE8F5F", // Warm peach color for the heading
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            Your Cart
          </Typography>
        </motion.div>

        {/* Cart Items */}
        <Box>
          {cartItems.map((e) => (
            <Box key={e.id} sx={{ marginBottom: "20px" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <img
                  src={import.meta.env.VITE_BASE_URL + e?.image[0]?.url}
                  alt={e.title}
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ color: "#4A4A4A" }}>
                    {e.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#4A4A4A" }}>
                    Quantity: {e.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#4A4A4A" }}>
                    Category: {e.categories[0]?.title}{" "}
                    {e.categories[1]?.title && `and ${e.categories[1]?.title}`}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#4A4A4A" }}>
                    ${e.price.toFixed(2)} each
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#4A4A4A" }}>
                    Total: ${e.price * e.cartQuantity}
                  </Typography>
                </Box>
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
                    onClick={() => dispatch(removeFromCart(e.id))}
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
                  <Typography>{e.cartQuantity}</Typography>

                  <IconButton
                    disabled={e.cartQuantity >= e.quantity}
                    onClick={() => dispatch(addToCart(e))}
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
                
              </Stack>
              <Divider sx={{ marginY: "10px" }} />
            </Box>
          ))}
        </Box>

        {/* Total Price Section */}
        <Box sx={{ marginTop: "20px" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ marginBottom: "20px" }}
          >
            <Typography variant="h6" sx={{ color: "#4A4A4A" }}>
              Total Price: 
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#DE8F5F", fontWeight: "bold" }}
            >
              ${totalPrice.toFixed(2)}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#DE8F5F",
              color: "white",
              "&:hover": { backgroundColor: "#D16458" },
              padding: "15px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Proceed to Checkout
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "8px",
              fontWeight: "bold",
              borderColor: "#D16458",
              color: "#D16458",
            }}
            onClick={() => dispatch(clear())}
          >
            Empty Cart
          </Button>
        </Box>
      </Box>
    </Box>:<CartEmpty/>}
    </>
  );
};

export default Cart;
