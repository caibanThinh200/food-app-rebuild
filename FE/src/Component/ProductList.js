import React, { useContext, useEffect, useState } from "react";
import { Spin, Input } from "antd";
import { context } from "../Context/Context";
import {
  SmileOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from "@ant-design/icons";

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
              {product <= 0 && <h1>No product available</h1>}
              {product.length > 0 &&
                product.map((value, key) => (
                  <div className="col-md-3 col-6">
                  <div
                    key={value.idProduct}
                    className="product-box"
                  >
                    <div className="card-wrapper mb-4">
                      <div className="card-img">
                        <img
                          width="100%"
                          height="200px"
                          src={API_URL + "/images/" + value.image}
                          alt="..."
                        />
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
                    <div className="text-center">
                      <h4 className="h5 mb-2">
                        <a href="#" className="text-secondary">
                          {value.nameFood}
                        </a>
                      </h4>
                      <h7 className="text-secondary h6 mb-2">
                        {value.foodAdress}
                      </h7>
                      <h5 className="mb-0 text-primary">${value.price}</h5>
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
      <div className="product-list">
        {" "}
        <section>
          <div className="container">
            <div className="row ">
              {!isLoading && bestSaled&&
                bestSaled.map((value, key) => (
                  <div className="col-md-3 col-6">
                  <div
                    key={value.idProduct}
                    style={{ marginBottom: "100px" }}
                    className="product-box"
                  >
                    <div className="card-wrapper mb-4">
                      <div className="card-img">
                        <img
                          width="100%"
                          height="200px"
                          src={API_URL + "/images/" + value.image}
                          alt="..."
                        />
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
                    <div className="text-center">
                      <h4 className="h5 mb-2">
                        <a href="#" className="text-secondary">
                          {value.nameFood}
                        </a>
                      </h4>
                      <h7 className="text-secondary h6 mb-2">
                        {value.foodAdress}
                      </h7>

                      <h5 className="mb-0 text-primary">${value.price}</h5>
                    </div>
                  </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductList;
