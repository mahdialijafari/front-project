import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert("Thank you for subscribing! Enjoy 10% off your first order.");
      setEmail("");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#3D2C2E", // Elegant dark background
        padding: "80px 10%",
        borderRadius: "40px",
        textAlign: "center",
        margin:'3% 5%'
      }}
    >
      {/* Heading */}
      <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#fff2ce", // Gold-like accent
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "10px",
          }}
        >
          Join Our VIP Club
        </Typography>
        <Typography variant="body1" sx={{ color: "#DE8F5F", marginBottom: "30px" }}>
          Be the first to know about exclusive offers, new arrivals, and styling tips!
        </Typography>
      </motion.div>

      {/* Email Subscription Form */}
      <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <TextField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "30px",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                padding: "10px 15px",
              },
            }}
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: "#DE8F5F", marginRight: "10px" }} />,
            }}
          />
          <Button
            onClick={handleSubscribe}
            sx={{
              backgroundColor: "#DE8F5F",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "#D16458",
                transform: "scale(1.05)",
              },
              transition: "0.3s ease-in-out",
            }}
          >
            Subscribe Now
          </Button>
        </Box>
      </motion.div>

      {/* Extra Perks */}
      <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
        <Typography
          variant="body2"
          sx={{
            color: "#fff2ce",
            marginTop: "20px",
            fontStyle: "italic",
          }}
        >
          🎁 Sign up today & enjoy 10% off for your first order!
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Newsletter;
