import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import fetchData from "../../Utils/fetchData";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Blog = () => {
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Fetch Blog Data from Strapi
  useEffect(() => {
    (async()=>{
        const res=await fetchData('blogs?populate=*')
        setBlogs(res.data)
        setLoading(false)
    })()
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "#E17564",
        padding: "80px 10%",
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#fff2ce",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "40px",
          }}
        >
          Our Jewelry Blog
        </Typography>
      </motion.div>

      {/* Blog Grid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress sx={{ color: "#DE8F5F" }} />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {blogs?.map((e, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
                <Card
                key={index}
                  sx={{
                    backgroundColor: "#fff2ce",
                    borderRadius: "16px",
                    boxShadow: "0 4px 10px rgba(222, 143, 95, 0.3)",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 15px rgba(222, 143, 95, 0.5)",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/blog/${e.slug}`)}
                >
                  <img
                    src={import.meta.env.VITE_BASE_URL + e.image.url}
                    alt={e.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3D2C2E", marginBottom: "10px" }}>
                      {e.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#8B6A60", marginBottom: "10px" }}>
                      {e.description.slice(0, 100)}...
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#A94A4A", fontStyle: "italic" }}>
                      By {e.author} | {e.date}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Load More Button */}
      <Box sx={{ textAlign: "center", marginTop: "40px" }}>
        <Button
          onClick={() => setPage(page + 1)}
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
          Load More
        </Button>
      </Box>
    </Box>
  );
};

export default Blog;
