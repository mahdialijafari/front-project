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
import { Link, useNavigate } from "react-router-dom";

    export default function Categories() {
    const [categorySlider, setCategorySlider] = useState();
    const navigate=useNavigate()
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
            import.meta.env.VITE_BASE_URL + e.image[0].formats?.medium?.url
            }
            alt={e.title}
        />
        <Link >{e.title}</Link>
        </SwiperSlide>
        
    ));
    return (
        <>
        <Typography sx={{textAlign:'center',marginTop:'3%',fontSize:'34px'}}>Categories</Typography>

        <Stack height={"70vh"} sx={{backgroundColor:'#E17564' ,margin:'1% 8%', padding:'3% 6%', borderRadius:'40px'}}>
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
