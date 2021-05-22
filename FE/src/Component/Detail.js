import { useEffect, useState, useContext } from "react";
import { context } from "../Context/Context";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Detail = (props) => {
  const { API_URL, isLoading, setIsLoading, addCart } = useContext(context);

  const { id } = useParams();

  const [detail, setDetail] = useState([]);
  const [cate, setCate] = useState([]);
  const [images, setImages] = useState([]);
  const getDetail = () => {
    fetch(API_URL + "/Home/idFood/" + id)
      .then((res) => res.json())
      .then((json) => setDetail(json));
  };
  const getCate = () => {
    if (detail.length > 0) {
      fetch(API_URL + "/Cate/" + detail[0].idCategory)
        .then((res) => res.json())
        .then((json) => {
          setCate(json);
        });
    }
  };
  const getListImages = () => {
    fetch(API_URL + "/Home/images/" + id)
      .then((res) => res.json())
      .then((json) => setImages(json.data));
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getDetail();
    getListImages();
    console.log(images);
  }, []);
  useEffect(() => {
    getCate();
  });

  if (isLoading) {
    return <div className="loading">loading......</div>;
  } else {
    return (
      <main className="container">
        <Link style={{ width: "100px" }} to="/product">
          Go back
        </Link>
        {detail.map(({ idProduct, nameFood, image, price, count }) => (
          <div className="container" key={idProduct}>
            <div className="left-column">
              <img
                className="main-img"
                src={"http://localhost:3010/images/" + image}
                alt=""
              />
              <div className="product-list-image">
                {images.length > 0 &&
                  images.map(({ id, image }) => (
                    <img
                      key={id}
                      src={"http://localhost:3010/images/" + image}
                    />
                  ))}
              </div>
            </div>
            <div className="right-column">
              {/* Product Description */}
              <div className="product-description">
                {cate.length > 0 &&
                  cate.map(({ idCategory, nameCategory }) => (
                    <span key={idCategory}>{nameCategory}</span>
                  ))}
                <h1>{nameFood}</h1>
                <p>
                  The preferred choice of a vast range of acclaimed DJs. Punchy,
                  bass-focused sound and high isolation. Sturdy headband and
                  on-ear cushions suitable for live performance
                </p>
              </div>
              {/* Product Configuration */}
              <div className="product-configuration">
                <div className="cable-config">
                  <a href="#">How to configurate your product</a>
                </div>
              </div>
              {/* Product Pricing */}
              <div className="product-price">
                <span>{price}$</span>
                <a
                  href="#"
                  onClick={() => {
                    addCart(idProduct);
                  }}
                  className="cart-btn"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Right Column */}
      </main>
    );
  }
};
export default Detail;
