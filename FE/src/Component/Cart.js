import { context } from "../Context/Context";
import React, { useContext, useEffect, useState } from "react";
import { find } from "lodash";
import { Button, Modal, Result, notification, Input } from "antd";
import axios from "axios";
import { useJwt } from "react-jwt";
function Cart(props) {
  const value = useContext(context);
  const [cart, setCart] = value.cart;
  const { API_URL, setModal } = value;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [note, setNote] = useState("");
  const token = JSON.parse(localStorage.getItem("token")) || "";
  let { decodedToken } = useJwt(token.token);

  const getTotal = () => {
    const cash = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    setTotal(cash);
  };
  useEffect(() => {
    getTotal();
  }, [cart]);
  const reduceProduct = (id) => {
    cart.forEach((item) => {
      if (item.idProduct === id) {
        item.count <= 0 ? (item.count = 1) : (item.count -= 1);
      }
    });
    setCart([...cart]);
  };
  const increaseProduct = (id) => {
    cart.forEach((item) => {
      if (item.idProduct === id) {
        item.count += 1;
      }
    });
    setCart([...cart]);
  };

  const removeProduct = (id, name) => {
    if (window.confirm("Do you want to remove this product ?")) {
      cart.forEach((item, index) => {
        if (item.idProduct === id) {
          cart.splice(index, 1);
          notification.open({
            message: "Remove success",
            description: name + " has been remove out of your cart",
          });
        }
      });

      setCart([...cart]);
    }
  };
  const showModalCart = () => {
    if (cart.length > 0) {
      setIsVisible(true);
    } else {
      notification.open({
        message: "No product in your cart",
        description: "Your cart is empty , please purchase product",
      });
    }
  };
  const onChangeNote = (e) => {
    setNote(e.target.value);
    console.log(note);
  };
  const handleOK = () => {
    if (cart.length > 0) {
      axios.put("http://localhost:3010" + "/Home/submit", cart).then((res) => console.log(res));
      const billInsert = {
        cart: cart,
        user: decodedToken.id,
        note: note,
        total: total,
      };
      axios.post(API_URL + "/Bill", billInsert).then(() => {
        notification.open({
          message: "Submit success",
          description: "Please check your bill",
        });
        handleClose();
        setCart([]);
      });
    } else {
      console.log(22);
      notification.open({
        message: "No product in your cart",
        description: "Your cart is empty , please purchase product",
      });
    }
  };
  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <div className="cart-container">
      <div className="cart-header textAlignCenter">
        <h1 className="voucher">Uber cart</h1>
      </div>

      <div className="cart-content">
        <div className="cart-content-left floatLeft">
          <h1>Product</h1>
          {cart.length <= 0 && (
            <div>
              <h2>No product in yout cart</h2>
            </div>
          )}
          {cart.length > 0 &&
            cart.map(
              (
                { idProduct, image, nameFood, price, foodAdress, count },
                key
              ) => (
                <div key={idProduct} className="cart-box">
                  <div className="cart-image floatLeft">
                    <img src={API_URL + "/images/" + image} />
                  </div>
                  <div
                    style={{ marginLeft: "20px" }}
                    className="product-cart floatLeft "
                  >
                    <h2>{nameFood}</h2>
                    <h3>{foodAdress}</h3>
                    <h3>{price}$</h3>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeProduct(idProduct, nameFood)}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Remove product
                    </button>
                    <div className="quantity textAlignRight  flexBox">
                      <button
                        onClick={() => increaseProduct(idProduct)}
                        className="quantity increase"
                      >
                        +
                      </button>
                      <input className="quantity" value={count} />
                      <button
                        onClick={() => reduceProduct(idProduct)}
                        className="quantity decrease "
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
        <div className="cart-content-right floatLeft">
          <h1>Total amount</h1>
          <div className="payment">
            <div className="pay-form">
              <span className="total">Total of products:</span>
              <span className="total floatRight">{total}$</span>
              <br />
              <span className="total ship">Ship cash:</span>
              <span className="total floatRight">0$</span>
            </div>
            <span className="total">
              Total:<span>(Included VAT)</span>
            </span>
            <span className="total floatRight">{total}$</span>
            <br />
            <button
              onClick={() => {
                showModalCart();
              }}
              className="submit-cart"
            >
              {" "}
              Submit
            </button>
            <Modal
              title="Submit"
              visible={isVisible}
              onOk={handleOK}
              footer={[
                <Button onClick={handleClose} key="back">
                  Return
                </Button>,
                <Button onClick={() => handleOK()} key="submit" type="primary">
                  OK
                </Button>,
              ]}
            >
              <div>Do you have any note:</div>
              <Input
                onChange={(e) => {
                  onChangeNote(e);
                }}
                placeholder="Ex: Extra cheese,..."
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
