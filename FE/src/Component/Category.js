import { HomeOutlined } from "@ant-design/icons";
import {Swiper, SwiperSlide} from 'swiper/react'
import { context } from "../Context/Context";
import React, { useContext, useEffect } from "react";
import "swiper/swiper.min.css";


function Category(props) {
  const { cate, getCate, isLoading, setIsLoading, getProductByCateId, API_URL } =
    useContext(context);
  useEffect(() => {
    getCate();
  }, []);

  if (cate.length <= 0) {
    return (
      <div id="cate-container" className="loading">
        <h1>No cate</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className="voucher textAlignCenter"
        >
          <h1>Category</h1>
        </div>
        <div className="container category">
        <div id="cate-container" className="cate-container textAlignCenter">
          <Swiper
          className="mySwiper"
            slidesPerView={2} 
            spaceBetween={10}
            breakpoints={{
              "640": {
                "slidesPerView": 4,
                "spaceBetween": 40
              },
              "768": {
                "slidesPerView": 4,
                "spaceBetween": 40
              },
              "1024": {
                "slidesPerView": 6,
                "spaceBetween": 60
              }
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {cate.length > 0 &&
            cate.map((value, key) => (
              <SwiperSlide>
              <div
                key={key}
                onClick={() => {
                  getProductByCateId(value.idCategory);
                }}
                className="cate-box floatLeft textAlignCenter"
              >
                <img
                  className="logo"
                  src={`${API_URL}/images/` + value.icon}
                />
                <br />
                <p>{value.nameCategory}</p>
              </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
        </div>
        </div>
      </div>
    );
  }
}
export default Category;
