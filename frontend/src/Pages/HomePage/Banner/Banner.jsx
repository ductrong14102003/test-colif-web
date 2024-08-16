import React from "react";
import WrapperContent from "../../../Components/WrapperContent/WrapperContent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.module.css";

const BANNERS = [
  {
    name: "Banner 1",
    image: "/images/banner-1.png",
  },
  {
    name: "Banner 2",
    image: "/images/banner-2.png",
  },
  {
    name: "Banner 3",
    image: "/images/banner-3.png",
  },
];

const Banner = () => {
  return (
    <WrapperContent>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        className={styles.wrapper}
        autoplay
        loop
        pagination={{ clickable: true }}
      >
        {BANNERS.map((it, index) => (
          <SwiperSlide key={index}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${it.image})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </WrapperContent>
  );
};

export default Banner;
