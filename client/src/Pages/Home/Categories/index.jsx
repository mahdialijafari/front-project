import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import fetchData from "../../../Utils/fetchData";
import { Button, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Categories() {
  const [categorySlider, setCategorySlider] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchData("categories?populate=*");
      setCategorySlider(response.data);
    })();
  }, []);

  const items = categorySlider?.map((e, index) => (
    <SwiperSlide key={index}>
      <img
        src={import.meta.env.VITE_BASE_URL + e.image[0]?.url}
        alt={e.title}
      />
      <Link to={`/products/${e.id}`}>{e.title}</Link>
    </SwiperSlide>
  ));

  const categorySectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#category-section") {
      categorySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [location]);

  return (
    <>
      <Stack ref={categorySectionRef} id="category-section" height={"80vh"} sx={{ backgroundColor: '#E17564', margin: '3% 8%', padding: '2% 6%',paddingBottom:'4%', borderRadius: '40px' }}>
        <Typography sx={{ textAlign: 'center', fontSize: '34px', marginBottom: '20px', color: '#3D2C2E' }}>Categories</Typography>
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
              slidesPerView: 3, // Show 2 slides on tablets
              spaceBetween: 30,  // Adjust space between slides for tablets
            },
            // When the viewport width is <= 768px (tablet and smaller devices)
            768: {
              slidesPerView: 2, // Show 2 slides on tablets
              spaceBetween: 20,  // Adjust space between slides for tablets
            },
            // When the viewport width is <= 480px (phones)
            480: {
              slidesPerView: 1, // Show 1 slide on phones
              spaceBetween: 10, // Adjust space between slides for phones
            },
            0: {
              slidesPerView: 1, // Show 1 slide on phones
              spaceBetween: 10, // Adjust space between slides for phones
            },
          }}
        >
          {items}
        </Swiper>
      </Stack>
    </>
  );
}
