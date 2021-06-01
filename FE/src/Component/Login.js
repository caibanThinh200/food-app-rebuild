import React, { useContext, useEffect, useState } from "react";
import {
  Input,
  Button,
  Modal,
  Image,
  Carousel,
  DatePicker,
  Alert,
  notification,
  Space,
  Select,
} from "antd";
import { context } from "../Context/Context";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import SlideRoutes from "react-slide-routes";
import Login from "./Login";
import Register from "./Register";
import "antd/dist/antd.css";
import { useLocation } from "react-router-dom";
function SignIn(props) {
  const {
    visible,
    setVisible,
    fullname,
    birth,
    username,
    password,
    phoneNum,
    address,
    mail,
    errorFullname,
    errorBirth,
    errorUsername,
    errorPhoneNum,
    errorPassword,
    errorAddress,
    errorsMail,
    errorLogin,
    onChangeFullName,
    onChangeBirth,
    onChangeUsername,
    onChangePassword,
    onChangePhoneNum,
    onChangeAddress,
    onChangeMail,
    submitData,
    submitLogin,
  } = useContext(context);
  const location = useLocation();
  const [disable, setDisable] = useState(true)
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={props.handleOk}
      footer={false}
      confirmLoading={props.confirmLoading}
      onCancel={props.handleCancel}
    >
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="toggle-form">
          <button
            data-bs-target="#carouselExampleIndicators"
            onClick={() => {props.changeTextLogin(); setDisable(!disable)}}
            data-bs-slide-to="1"
            className="active"
            disabled={disable}
          >Login</button>
          <button
            data-bs-target="#carouselExampleIndicators"
            onClick={() => {props.changeTextRegister(); setDisable(!disable)}}
            data-bs-slide-to="0"
            disabled={!disable}
          >Register</button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item">
            <h1 className="user-title">Register User</h1>
            <div className="register-form">
              <div className="form-item">
              <Input
                name="fullname"
                onChange={(e) => {
                  onChangeFullName(e);
                }}
                type="text"
                placeholder="Nhập họ tên ..."
              />
              </div>
              <div className="form-item">
              <DatePicker
                  onChange={(e) => {
                    onChangeBirth(e);
                  }}
                  className="date_picker"
                  placeholder="Chọn ngày sinh ..."
                />
              </div>
              <div className="form-item">
              <Input
                onChange={(e) => {
                  onChangePhoneNum(e);
                }}
                placeholder="Nhập số điện thoại ..."
              />
              </div>
              <div className="form-item">
              <Input
                onChange={(e) => {
                  onChangeAddress(e);
                }}
                placeholder="Nhập địa chỉ ..."
              />
              </div>
                <div className="form-item">
                <Input
                onChange={(e) => {
                  onChangeMail(e);
                }}
                placeholder="Nhập email ..."
              />
                </div>
                <div className="form-item">
                <Input
                onChange={(e) => {
                  onChangeUsername(e);
                }}
                placeholder="Nhập tên người dùng ..."
              />
                </div>
                <div className="form-item">
                <Input
                onChange={(e) => {
                  onChangePassword(e);
                }}
                type="password"
                placeholder="Nhập mật khẩu ..."
              />
                </div>
              <button
                onClick={(e) => {
                  submitData(e);
                }}
                className="bg-warning"
              >
                Register
              </button>
            </div>
          </div>
          <div className="carousel-item active">
            <h1 className="user-title">Login User</h1>
            <div className="register-form">
              <Input
                onChange={(e) => {
                  onChangeUsername(e);
                }}
                placeholder="Nhập tên người dùng ..."
              />

              <Input
                onChange={(e) => {
                  onChangePassword(e);
                }}
                type="password"
                placeholder="Nhập mật khẩu ..."
              />
              <br />

              <button
                onClick={(e) => {
                  submitLogin(e);
                  props.disable();
                }}
                className="bg-warning"
              >
                Login
              </button>
              {errorLogin && (
                <Alert
                  style={{ width: "70%", margin: "30px 60px" }}
                  message="Invalid username or password"
                  type="error"
                  showIcon
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default SignIn;
