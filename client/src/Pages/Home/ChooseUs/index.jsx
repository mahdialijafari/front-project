import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import LockIcon from "@mui/icons-material/Lock";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

// Styled Card Component
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <VerifiedIcon sx={{ fontSize: 40, color: "#E17564" }} />,
      title: "Premium Quality",
      description: "100% authentic, high-quality jewelry.",
    },
    {
      id: 2,
      icon: <LockIcon sx={{ fontSize: 40, color: "#E17564" }} />,
      title: "Secure Payments",
      description: "Safe & trusted transactions.",
    },
    {
      id: 3,
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#E17564" }} />,
      title: "Fast Shipping",
      description: "Delivered within X days worldwide.",
    },
    {
      id: 4,
      icon: <AutorenewIcon sx={{ fontSize: 40, color: "#E17564" }} />,
      title: "Easy Returns",
      description: "Hassle-free returns within 7 days.",
    },
    {
      id: 5,
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#E17564" }} />,
      title: "24/7 Support",
      description: "Assistance for all your queries.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#DE8F5F",
        padding: "60px 8%",
        borderRadius: "40px",
        textAlign: "center",
        margin:'0 5%'
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "30px", color: "#3D2C2E" }}
      >
        Why Choose Jewel Nest?
      </Typography>

      {/* Feature Grid */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={feature.id}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <StyledCard sx={{backgroundColor:'#fff2ce'}}>
                <CardContent>
                  {feature.icon}
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: "10px" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", marginTop: "5px" }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ChooseUs;
