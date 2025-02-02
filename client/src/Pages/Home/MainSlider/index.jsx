import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import fetchData from "../../../Utils/fetchData";
import { Box } from "@mui/material";

export default function MainSlider() {
  const [sliders, setSliders] = useState([]); // ✅ Default as empty array

  useEffect(() => {
    (async () => {
      const response = await fetchData("sliders?populate=*");
      setSliders(response.data || []); // ✅ Ensure it's an array
    })();
  }, []);

  return (
    <Box height={"85vh"}>
      {sliders.length > 0 ? ( // ✅ Prevents rendering Swiper before data loads
        <Swiper
          key={sliders.length} // ✅ Reinitialize Swiper when new images arrive
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
          navigation={{ enabled: sliders.length > 0 }} // ✅ Enables navigation when images are loaded
          modules={[Pagination, Navigation, Autoplay]}
          className="main-slider"
        >
          {sliders.map((e, index) => (
            <SwiperSlide key={index}>
              <img
                src={import.meta.env.VITE_BASE_URL + e.image.url}
                alt={e.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p style={{ textAlign: "center", color: "#E17564" }}>Loading...</p> // ✅ Prevent empty Swiper
      )}
    </Box>
  );
}
