import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #872341, #BE3144, #E17564, #DE8F5F)",
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Animated 404 */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h1" sx={{ fontSize: { xs: "120px", md: "180px" }, fontWeight: "bold" }}>
          404
        </Typography>
      </motion.div>

      {/* Error Message */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Oops! The page you are looking for does not exist.
      </Typography>

      {/* Button to Navigate Home */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#872341",
            "&:hover": { backgroundColor: "#BE3144" },
            fontSize: "18px",
            padding: "10px 20px",
            borderRadius: "25px",
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </motion.div>
    </Box>
  );
}
