import { useEffect, useState, useContext } from "react";
import { context } from "../Context/Context";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Detail = (props) => {
  const { API_URL, isLoading, setIsLoading, addCart, getDetailProduct} = useContext(context);

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
    getDetail();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getDetailProduct(id);
    getListImages();
    console.log(images);
  }, []);
  useEffect(() => {
    getCate();
  },[JSON.stringify(cate)]);

  if (isLoading) {
    return <div className="loading">loading......</div>;
  } else {
    return (
      <main className="container" id="detail-page" style={{minHeight:'60vh'}}>
        {detail.map(({ idProduct, nameFood, image, price, count }) => (
          <div className="container" key={idProduct}>
            <div className="row">
              <div>
              <Link id="go-back" style={{ width: "100px" }} to="/product">
                <button><i class="fas fa-long-arrow-left"></i>Go back</button>
              </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <img
                  className="main-img"
                  src={API_URL + "/images/" + image}
                  alt=""
                />
                <div className="product-list-image">
                  {/* {images.length &&
                    images.map(({ id, image }) => (
                      <img
                        key={id}
                        src={API_URL + "/images/" + image}
                      />
                    ))} */}
                </div>
              </div>
              <div className="col-md-6">
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
                <span>{new Intl.NumberFormat().format(price)} VND</span>
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
          </div>
        ))}

        {/* Right Column */}
      </main>
    );
  }
};
export default Detail;
