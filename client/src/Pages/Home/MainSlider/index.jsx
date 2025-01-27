import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import fetchData from "../../../Utils/fetchData";
import { Box } from "@mui/material";

export default function MainSlider() {
  const [sliders, setSliders] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetchData("sliders?populate=*");
      setSliders(response.data);
    })();
  }, []);
  const items = sliders?.map((e, index) => (
    <SwiperSlide key={index}>
      <img
        src={
          import.meta.env.VITE_BASE_URL + e.image.formats.medium.url
        }
        alt={e.title}
      />
    </SwiperSlide>
  ));


  return (
    <Box height={"85vh"} >
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation,Autoplay]}
        className="main-slider"
      >
        {items}
      </Swiper>
    </Box>
  );
}
