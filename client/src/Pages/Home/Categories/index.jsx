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
            src={
            import.meta.env.VITE_BASE_URL + e.image[0]?.url
            }
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
        <Typography sx={{textAlign:'center',marginTop:'3%',fontSize:'34px'}}>Categories</Typography>

        <Stack ref={categorySectionRef} id="category-section" height={"70vh"} sx={{backgroundColor:'#E17564' ,margin:'1% 8%', padding:'3% 6%', borderRadius:'40px'}}>
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
            modules={[FreeMode, Pagination,Autoplay]}
            className="categories-slider"
        >
            {items}
        </Swiper>
        </Stack>
        </>
    );
    }
