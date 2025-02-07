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
import { Add, Delete, Remove } from "@mui/icons-material";
import { addToCart, clear, removeFromCart } from "../../Store/Slices/CartSlice";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  return (
    <>
      {cartItems.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            background: "linear-gradient(45deg, #872341, #E17564)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "10px", md: "20px" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "900px",
              padding: { xs: "20px", md: "40px" },
              backgroundColor: "#fff2ce",
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
                variant="h4"
                sx={{
                  textAlign: "center",
                  color: "#DE8F5F",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  fontSize: { xs: "24px", md: "32px" },
                }}
              >
                Your Cart
              </Typography>
            </motion.div>

            {/* Cart Items */}
            <Box>
              {cartItems.map((e) => (
                <Box key={e.id} sx={{ marginBottom: "20px" }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="center"
                  >
                    <img
                      src={import.meta.env.VITE_BASE_URL + e?.image[0]?.url}
                      alt={e.title}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <Box sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}>
                      <Typography
                        variant="h6"
                        sx={{ color: "#4A4A4A", fontSize: { xs: "16px", md: "18px" } }}
                      >
                        {e.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#4A4A4A" }}>
                        Category: {e.categories[0]?.title}{" "}
                        {e.categories[1]?.title && `and ${e.categories[1]?.title}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#4A4A4A", fontSize: { xs: "14px", md: "16px" } }}
                      >
                        ${e.price.toFixed(2)} each
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#4A4A4A", fontSize: { xs: "14px", md: "16px" } }}
                      >
                        Total: ${e.price * e.cartQuantity}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconButton
                        onClick={() => dispatch(removeFromCart(e.id))}
                        sx={{
                          backgroundColor: "#E17564",
                          color: "white",
                          "&:hover": { backgroundColor: "#D16458" },
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
                          "&:hover": { backgroundColor: "#D16458" },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Stack>
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
                sx={{ marginBottom: "20px", flexWrap: "wrap" }}
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
                  fontSize: { xs: "14px", md: "16px" },
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
                  fontSize: { xs: "14px", md: "16px" },
                }}
                onClick={() => dispatch(clear())}
              >
                Empty Cart
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};

export default Cart;
