import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import {
  Button,
  Input,
  Modal,
  Image,
  Carousel,
  Dropdown,
  Menu,
  message,
  notification,
} from "antd";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  MoneyCollectFilled,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../Context/Context";
import Item from "antd/lib/list/Item";
import Login from "./Login";
import Register from "./Register";
import SlideRoutes from "react-slide-routes";
import { useJwt } from "react-jwt";

const { Search } = Input;
function Header(props) {
  const {
    API_URL,
    product,
    productFilled,
    setProduct,
    getProduct,
    isLoading,
    setIsLoading,
    cart,
    search,
    setSearch,
    visible,
    setVisible,
    confirmLoading,
    setConfirmLoading,
    modalText,
    setModalText,
    showModal,
    handleCancel,
    handleOk,
    onChangeSearch,
    searchAction,
  } = useContext(context);

  const [userInf, setUserInf] = useState([]);
  const token = JSON.parse(localStorage.getItem("token")) || "";

  const { isExpired, decodedToken } = useJwt(token.token);

  const getUserInfo = () => {
    //console.log(isExpired);
    if (token) {
      if (!isExpired) {
        fetch(API_URL + "/User/s/userprofile", {
          headers: {
            Authorization: "Bearer " + token.token,
          },
        })
          .then((res) => res.json())
          .then((json) => setUserInf(json));
      } else if (isExpired) {
        alert("Token expired,please login again");
        showModal();
      }
    }
  };

  const disable = () => {
    setVisible(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUserInf([]);
    notification.open({
      message: "Logout",
      description: "You have logout",
    });
    showModal();
  };
  const changeTextRegister = () => {
    setModalText("Register");
  };
  const changeTextLogin = () => {
    setModalText("Login");
  };

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    getUserInfo();
  }, [token.token]);

  const menu = (id) => (
    <Menu style={{ width: "100px" }}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to={"profile/" + id}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<MoneyCollectFilled />}>
        <Link to={"/bill"}>List bill</Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout()} key="3" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="bg-dark">
     <p style={{marginBottom:'0', padding: '5px 15px'}} className="text-white"><i class="fal fa-map-marker-alt" style={{marginRight:'10px'}}></i>Address: 155 Sư Vạn Hạnh street Ho Chi Minh City</p>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <Link className="navbar-brand" to="/"><img
                id="uber-logo"
                src={process.env.PUBLIC_URL + "/logo-food-app.jpg"}
              />
                <span id="logo-title">FoodApp</span>
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
            </div>
            <div className="col-lg-9" >
              <div className="collapse navbar-collapse " id="navbar">
                <div className="navbar-nav">
                  <Link to="/" className="nav-link " aria-current="page" >Home</Link>
                  <Link to="/product" className="nav-link " aria-current="page" >Product</Link>
                  <Link to="/cart" className="nav-link " aria-current="page">Cart ({cart[0].length})</Link>
                  <Link to="/" className="nav-link " aria-current="page" >About us</Link>
                  <Link to="/" className="nav-link " aria-current="page" >Contact</Link>
                </div>
                {!isExpired ? (
                  <span style={{ marginLeft: "35%", width: "100px" }}>
                    {decodedToken && (
                      <Dropdown.Button
                        style={{ float: "right" }}
                        size="large"
                        overlay={menu(decodedToken.id)}
                        key={decodedToken.id}
                      >
                        Hello {decodedToken.username}
                      </Dropdown.Button>
                    )}
                  </span>
                ) : (
                    <>
                      <button
                        className="link bg-danger"
                        onClick={showModal}
                      >
                        Login now
                    </button>
                      <Login
                        changeTextRegister={() => changeTextRegister()}
                        changeTextLogin={() => changeTextLogin()}
                        visible={visible}
                        disable={() => disable()}
                        handleOk={handleOk}
                        confirmLoading={confirmLoading}
                        handleCancel={handleCancel}
                        title={modalText}
                      />
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

  );
}
export default Header;
