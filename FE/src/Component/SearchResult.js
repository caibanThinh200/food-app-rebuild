import { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { context } from "../Context/Context";
import axios from "axios";

function SearchResult(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { productFilled, setProductFilled, API_URL, searchOnResult } =
    useContext(context);

  const { search, searchAction } = props;

  const productFilter = () => {
    const search_string = search.trim().toLowerCase();

    axios
      .get(API_URL + "/Home")
      .then((res) => {
        if (search_string.length > 0) {
          const result = res.data.filter((item) => {
            return item.nameFood.toLowerCase().match(search_string);
          });

          setProductFilled(result);
        }
      })
      .then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      )
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    productFilter();
  }, [search]);
  return (
    <div className="search-result-container">
      {isLoading && (
        <div className="textAlignCenter">
          <Spin
            className="loading"
            style={{ marginTop: "30px" }}
            size="large"
          />
        </div>
      )}
      {productFilled.length > 0 ? (
        productFilled.map(({ idProduct, nameFood, image }) => (
          <div
            onClick={() => searchOnResult(idProduct)}
            key={idProduct}
            className="search-product-result"
          >
            <div className="col-sm-4">
              <img
                className="search-product-image floatLeft"
                src={"http://localhost:3010/images/" + image}
              />
            </div>
            <div className="col-sm-8 search-title">
              <h4>{nameFood}</h4>
            </div>
            <div className="clear-both"></div>
          </div>
        ))
      ) : (
        <div className="search-product-result">
          <div className="no-search">
            <i className="fas fa-search"></i> No result found
          </div>
        </div>
      )}
    </div>
  );
}
export default SearchResult;
