import { context } from "../Context/Context";
import React, { useContext, useEffect, useState } from "react";
import { find } from "lodash";
import { Button, Modal, Result, notification, Input, Form } from "antd";
import axios from "axios";
import { useJwt } from "react-jwt";
function Cart(props) {
  const value = useContext(context);
  const [cart, setCart] = value.cart;
  const { API_URL, setModal,DEV_URL } = value;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [note, setNote] = useState("");
  const token = JSON.parse(localStorage.getItem("token")) || "";
  let { decodedToken } = useJwt(token.token);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 },
  };

  const getTotal = () => {
    const cash = cart.reduce((prev, item) => {
      if(item.foodAddress > 0){
        return prev + item.price*((100-item.foodAddress)/100) * item.count;
      }
      else return prev + item.price * item.count;
    }, 0);
    setTotal(cash);
  };
  useEffect(() => {
    if (decodedToken) {
      form.setFieldsValue(decodedToken);
      setInfo(decodedToken)
    }
  }, [])
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
  const onChangeInfo = (e) => {
    const newInfo = {
      [e.target.name]: e.target.value
    }
    console.log(newInfo)
    form.setFieldsValue(newInfo);
    setInfo({ ...info, ...newInfo })
  };
  console.log(info)
  const handleOK = () => {
    if (cart.length > 0) {
      axios.put(API_URL + "/Home/submit", cart).then((res) => console.log(res));
      const billInsert = {
        cart: cart,
        user: info.id,
        address: info.address,
        phone: info.phone,
        note: info.note,
        total: total,
      };
      console.log(billInsert)
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
    <div className="cart-container" style={{ marginBottom: "150px" }}>
      <div className="cart-header textAlignCenter">
        <div className="voucher">
          <h1>Your cart</h1>
        </div>
      </div>

      <div className="cart-content container">
        <div className="row">
          <div className="col-md-8">
            {cart.length <= 0 && (
              <div>
                <h2>No product in yout cart</h2>
              </div>
            )}
            {cart.length > 0 &&
              cart.map(
                (
                  { idProduct, image, nameFood, price, foodAddress, count },
                  key
                ) => (
                    <div key={idProduct} className="cart-box">
                      <div className="container-fluid">
                        <div className="row">
                          <div
                            className="col-sm-7"
                            style={{ paddingLeft: "0", paddingRight: "0" }}
                          >
                            <div className="cart-image">
                              <img src={API_URL + "/images/" + image} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <div
                              style={{ marginLeft: "20px" }}
                              className="product-cart "
                            >
                              <h2>{nameFood}</h2>
                              {foodAddress > 0 ? <div>
                                <h6 className="old-price text-muted">{new Intl.NumberFormat().format(price)}</h6>
                                <h4>{new Intl.NumberFormat().format(price*(100 - foodAddress)/100)} VND</h4>
                              </div> :
                                <h4>{new Intl.NumberFormat().format(price)} VND</h4>
                              }
                              <h6 className="old-price"></h6>
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
                                <input
                                  defaultValue="0"
                                  className="quantity"
                                  value={count}
                                />
                                <button
                                  onClick={() => reduceProduct(idProduct)}
                                  className="quantity decrease "
                                >
                                  -
                              </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
          <div className="col-md-4 shadow-sm" style={{ padding: "20px" }}>
            <h1>Total amount</h1>
            <div className="payment">
              <div className="pay-form">
                <span className="total">Total of products:</span>
                <span className="total floatRight">
                  {new Intl.NumberFormat().format(total)} VND
                </span>
                <br />
                <span className="total ship">Ship cash:</span>
                <span className="total floatRight">0</span>
              </div>
              <span className="total">
                Total:<span>(Included VAT)</span>
              </span>
              <span className="total floatRight">
                {new Intl.NumberFormat().format(total)} VND
              </span>
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
                width={800}
                title="Submit"
                visible={isVisible}
                onOk={handleOK}
                onCancel={handleClose}
                footer={[
                  <Button onClick={handleClose} key="back">
                    Return
                  </Button>,
                  <Button
                    onClick={() => handleOK()}
                    key="submit"
                    type="primary"
                  >
                    OK
                  </Button>,
                ]}
              >
                <Form form={form} {...layout}>
                  <Form.Item label="Name:">
                    <Input
                      name="fullname"
                      onChange={(e) => {
                        onChangeInfo(e);
                      }}
                      value={info.fullname || ""}
                    />
                  </Form.Item>
                  <Form.Item label="Phone number:">
                    <Input
                      name="phone"
                      onChange={(e) => {
                        onChangeInfo(e);
                      }}
                      value={info.phone || ""}
                    />
                  </Form.Item>
                  <Form.Item label="Address:">
                    <Input
                      name="address"
                      onChange={(e) => {
                        onChangeInfo(e);
                      }}
                      value={info.address || ""}
                    />
                  </Form.Item>
                  <Form.Item label="Do you have any note:">
                    <Input
                      name="note"
                      onChange={(e) => {
                        onChangeInfo(e);
                      }}
                      placeholder="Ex: Extra cheese,..."
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
