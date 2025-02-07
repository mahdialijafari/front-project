import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import fetchData from "../../../Utils/fetchData";
import { Stack, Typography } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Categories() {
  const [categorySlider, setCategorySlider] = useState([]);
  const {categoryId}=useParams()
  // Fetch category data
  useEffect(() => {
    (async () => {
      const response = await fetchData("categories?populate=*");
      setCategorySlider(response.data);
    })();
  }, []);

  // Generate category items for Swiper slides
  const items = categorySlider?.map((e, index) => (
    <SwiperSlide key={index}>
      <img
        src={import.meta.env.VITE_BASE_URL + e.image[0]?.url}
        alt={e.title}
      />
      {/* Fixing the category link to include both id and slugged title */}
      <Link to={`/products/${e.id}/${e.title.replaceAll(" ", "-").toLowerCase()}`}>
        {e.title}
      </Link>
    </SwiperSlide>
  ));

  const categorySectionRef = useRef(null);
  const location = useLocation();

  // Scroll to the category section when the hash is set
  useEffect(() => {
    if (location.hash === "#category-section") {
      categorySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [location]);

  return (
    <>
      <Stack ref={categorySectionRef} id="category-section" height={"80vh"} sx={{ backgroundColor: '#E17564', margin: '3% 5%', padding: '2% 5%', paddingBottom: '4%', borderRadius: '40px' }}>
        <Typography sx={{ textAlign: 'center', fontSize: '34px', marginBottom: '20px', color: '#3D2C2E' }}>
          Categories
        </Typography>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="categories-slider"
          breakpoints={{
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
        >
          {items}
        </Swiper>
      </Stack>
    </>
  );
}
