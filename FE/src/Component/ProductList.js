import React, { useContext, useEffect, useState } from "react";
import { context } from "../Context/Context";
import { Spin, Input, Result, Button, Tag } from "antd";
import {
  SmileOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import SearchResult from "./SearchResult";
const { Search } = Input;

function ProductList(props) {
  const {
    API_URL,
    product,
    isLoading,
    bestSaled,
    setIsLoading,
    getProduct,
    getBestSaledProduct,
    cart,
    addCart,
    getDetailProduct,
    searchAction,
    onChangeSearch,
    search,
    productFilled,
    productFilter,
  } = useContext(context);
  useEffect(() => {
    getProduct();
    getBestSaledProduct();
  }, []);
  const disableSearch = () => {
    document.getElementsByClassName("search-input")[0].style.top = "0";
    document.getElementsByClassName(
      "search-result-container"
    )[0].style.display = "none";
  };

  return (
    <div className="product-list-container" onClick={() => disableSearch()}>
      <div></div>
      <div className="voucher textAlignCenter">
        <h1>Latest product</h1>
      </div>
      <div className="container">
        <div className="search-input">
          <Search
            onChange={(e) => onChangeSearch(e)}
            placeholder="input search here..."
            className="search-value"
            // enterButton="Search"
            size="large"
            onSearch={() => searchAction()}
          />
          <SearchResult search={search} searchAction={searchAction} />
        </div>
      </div>
      <div className="product-list">
        {" "}
        <section>
          <div className="container">
            <div className="row ">
              {isLoading && (
                <Spin size={"large"} style={{ margin: "100px 500px" }} />
              )}
              {product <= 0 && (
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, there are no product available"
                />
              )}
              {product.length > 0 &&
                product.map((value, key) => (
                  <div className="col-md-3 col-6">
                    <div key={value.idProduct} className="product-box">
                      <div className="card-wrapper mb-4">
                        <div className="card-img">
                          <img
                            width="100%"
                            height="200px"
                            src={API_URL + "/images/" + value.image}
                            alt="..."
                          />
                          {value.foodAddress > 0 && (
                            <Tag
                              className="sale-off"
                              color="#f50"
                              style={{ padding: "5px 10px" }}
                            >
                              {" "}
                              Sale {value.foodAddress} %
                            </Tag>
                          )}
                        </div>
                        <div className="card-body">
                          <div>
                            <Link to={"/product/" + value.idProduct}>
                              <i className="fas fa-eye"></i>
                            </Link>
                            <i
                              onClick={() => addCart(value.idProduct)}
                              className="fal fa-shopping-cart"
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="product-infor">
                        <h4 className="h5 mb-2">
                          <a href="#" className="text-secondary">
                            {value.nameFood}
                          </a>
                        </h4>
                        {value.foodAddress == 0 ? (
                          <div className="mt-3 d-flex justify-content-center">
                            <h5 className="mb-0 text-primary">
                              {new Intl.NumberFormat().format(value.price)} VND
                            </h5>
                          </div>
                        ) : (
                          <div className="d-flex mt-3">
                            <p className="old-price">
                              {new Intl.NumberFormat().format(value.price)}
                            </p>
                            <h5 className="mb-0 text-danger">
                              {new Intl.NumberFormat().format(
                                (value.price * (100 - value.foodAddress)) / 100
                              )}{" "}
                              VND
                            </h5>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
      <div className="voucher textAlignCenter">
        <h1>Best saled</h1>
      </div>
      <Swiper
        className="mySwiper container"
        slidesPerView={4}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 60,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <div className="product-list">
          {" "}
          <section>
            <div className="container">
              {" "}
              <div className="row">
                {!isLoading &&
                  bestSaled &&
                  bestSaled.slice(0, 7).map((value, key) => (
                    <SwiperSlide>
                      <div>
                        <div
                          key={value.idProduct}
                          style={{ marginBottom: "100px" }}
                          className="product-box col-12"
                        >
                          <div className="card-wrapper mb-4">
                            <div className="card-img">
                              <img
                                width="100%"
                                height="200px"
                                src={API_URL + "/images/" + value.image}
                                alt="..."
                              />
                              {value.foodAddress > 0 && (
                                <Tag
                                  className="sale-off"
                                  color="#f50"
                                  style={{ padding: "5px 10px" }}
                                >
                                  {" "}
                                  Sale {value.foodAddress} %
                                </Tag>
                              )}
                            </div>
                            <div className="card-body">
                              <div>
                                <Link to={"/product/" + value.idProduct}>
                                  <i className="fas fa-eye"></i>
                                </Link>
                                <i
                                  onClick={() => addCart(value.idProduct)}
                                  className="fas fa-shopping-cart"
                                ></i>
                              </div>
                            </div>
                          </div>
                          <div className="product-infor">
                            <h4 className="h5 mb-2">
                              <a href="#" className="text-secondary">
                                {value.nameFood}
                              </a>
                            </h4>
                            {value.foodAddress == 0 ? (
                              <div className="mt-3 d-flex justify-content-center">
                                <h5 className="mb-0 text-primary">
                                  {new Intl.NumberFormat().format(value.price)}{" "}
                                  VND
                                </h5>
                              </div>
                            ) : (
                              <div className="d-flex mt-3">
                                <p className="old-price">
                                  {new Intl.NumberFormat().format(value.price)}
                                </p>
                                <h5 className="mb-0 text-danger">
                                  {new Intl.NumberFormat().format(
                                    (value.price * (100 - value.foodAddress)) /
                                      100
                                  )}{" "}
                                  VND
                                </h5>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </div>
            </div>
          </section>
        </div>{" "}
      </Swiper>
    </div>
  );
}

export default ProductList;
