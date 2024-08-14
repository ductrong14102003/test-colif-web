import React, { useState, useEffect } from "react";
import "./Hero.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const banners = [
  {
    image: "../Assets/banner 1.png",
    alt: "Banner 1",
    caption: "BANNER 1 CAPTION"
  },
  {
    image: "../Assets/banner 2.png",
    alt: "Banner 2",
    caption: "BANNER 2 CAPTION"
  },
  {
    image: "../Assets/banner 3.png",
    alt: "Banner 3",
    caption: "BANNER 3 CAPTION"
  }
];

const Hero = () => {
  const settings = {
    dots: true, // Hiển thị các điểm điều hướng
    infinite: true, // Chạy vòng lặp
    speed: 500, // Tốc độ chuyển động (ms)
    slidesToShow: 1, // Số lượng slide hiển thị
    slidesToScroll: 1, // Số lượng slide cuộn
    autoplay: true, // Tự động chuyển động
    autoplaySpeed: 5000, // Tốc độ tự động chuyển động (ms)
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

 
};

export default Hero;