import { Box, Typography, Grid, Divider, Button, Link } from "@mui/material";
import { Facebook, Instagram, Twitter, Email, Phone } from "@mui/icons-material";
import {  useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate=useNavigate()
  return (
    <Box
      sx={{
        backgroundColor: "#3D2C2E", // Deep Mocha
        color: "#F3E9DC", // Creamy Beige
        py: 6,
        px: 4,
        textAlign: "center",
        mt: 8, // Spacing from content
        borderTop: "3px solid #DE8F5F", // Warm Peach Accent
      }}
    >
      <Grid container spacing={5} justifyContent="center">
        {/* Brand Name & Tagline */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" fontWeight="bold" color="#DE8F5F">
            Jewel Nest
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
            Adorn Yourself with Timeless Beauty ✨
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={4} sx={{display:'flex',flexDirection:'column'}}>
          <Typography variant="h6" fontWeight="bold" color="#BFA181">
            Explore
          </Typography>
          <Button onClick={()=>navigate('/#category-section')} color="inherit" underline="none" display="block" sx={{ transition: "0.3s", "&:hover": { color: "#DE8F5F" } }}>
            Collections
          </Button>
          <Button  color="inherit" underline="none" display="block" sx={{ transition: "0.3s", "&:hover": { color: "#DE8F5F" } }}>
            Custom Jewelry
          </Button>
          <Button  color="inherit" underline="none" display="block" sx={{ transition: "0.3s", "&:hover": { color: "#DE8F5F" } }}>
            Contact Us
          </Button>
          <Button
            color="inherit"
            underline="none"
            display="block"
            sx={{
              transition: "0.3s",
              "&:hover": { color: "#DE8F5F" },
            }}
          >
            Privacy Policy
          </Button>
        </Grid>

        {/* Contact & Social Media */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" fontWeight="bold" color="#BFA181">
            Get in Touch
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <Phone sx={{ fontSize: "18px", verticalAlign: "middle" }} /> +123 456 7890
          </Typography>
          <Typography variant="body2">
            <Email sx={{ fontSize: "18px", verticalAlign: "middle" }} /> support@jewelnest.com
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Link href="#" color="inherit" sx={{ mx: 1, transition: "0.3s", "&:hover": { color: "#DE8F5F" } }}>
              <Facebook />
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1, transition: "0.3s", "&:hover": { color: "#DE8F5F" } }}>
              <Instagram />
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1, transition: "0.3s", "&:hover": { color: "#DE8F5F" } }}>
              <Twitter />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, backgroundColor: "rgba(255, 255, 255, 0.3)" }} />

      <Typography variant="body2" color="#BFA181">
        © {new Date().getFullYear()} Jewel Nest. Crafted with Passion & Elegance.
      </Typography>
    </Box>
  );
}
