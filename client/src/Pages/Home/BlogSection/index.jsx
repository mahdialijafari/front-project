import React from "react";
import { Box, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

// Styled Blog Card
const BlogCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff2ce", // Light background for contrast
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgba(222, 143, 95, 0.3)", // Warm glow effect
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 15px rgba(222, 143, 95, 0.5)", // More intense hover effect
  },
}));

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "How to Layer Necklaces Like a Pro",
      description:
        "Master the art of layering necklaces to create a stylish and effortless look.",
      author: "Sophia Carter",
      date: "Jan 25, 2025",
      link: "/blog/layer-necklaces",
    },
    {
      id: 2,
      title: "5 Must-Have Jewelry Pieces for Every Occasion",
      description:
        "Discover the essential jewelry pieces that every woman should own for any event.",
      author: "Emily Jones",
      date: "Feb 10, 2025",
      link: "/blog/must-have-jewelry",
    },
    {
      id: 3,
      title: "Jewelry Care Tips to Keep Your Pieces Shining",
      description:
        "Learn the best ways to clean and maintain your jewelry to ensure its longevity.",
      author: "Michael Thompson",
      date: "March 5, 2025",
      link: "/blog/jewelry-care-tips",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#DE8F5F", // Dark Mocha Background
        padding: "80px 10%",
        borderRadius: "40px",
        textAlign: "center",
        margin:'3% 5%'
      }}
    >
      {/* Title */}
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
          Jewelry Trends & Styling Tips
        </Typography>
        <Typography variant="body1" sx={{ color: "#DE8F5F", marginBottom: "30px" }}>
          Stay updated with the latest jewelry trends, styling inspiration, and expert care tips!
        </Typography>
      </motion.div>

      {/* Blog Cards */}
      <Grid container spacing={4} justifyContent="center">
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
              <BlogCard>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#3D2C2E",
                      marginBottom: "10px",
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8B6A60", marginBottom: "10px" }}>
                    {blog.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#A94A4A", fontStyle: "italic" }}>
                    By {blog.author} | {blog.date}
                  </Typography>
                  <Box sx={{ marginTop: "15px" }}>
                    <Button
                      href={blog.link}
                      sx={{
                        backgroundColor: "#DE8F5F",
                        color: "white",
                        fontWeight: "bold",
                        padding: "8px 16px",
                        borderRadius: "30px",
                        "&:hover": {
                          backgroundColor: "#D16458",
                          transform: "scale(1.05)",
                        },
                        transition: "0.3s ease-in-out",
                      }}
                    >
                      Read More
                    </Button>
                  </Box>
                </CardContent>
              </BlogCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogSection;
