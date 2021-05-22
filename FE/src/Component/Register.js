import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Space,
  Select,
  Input,
  Button,
  DatePicker,
  Alert,
  notification,
  Modal,
} from "antd";
import "antd/dist/antd.css";
import Validator from "simple-react-validator";
import { ContextProvider, context } from "../Context/Context";
import { SmileOutlined } from "@ant-design/icons";
function SignUp(props) {
  const validate = useRef(new Validator());
  const {
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
    onChangeFullName,
    onChangeBirth,
    onChangeUsername,
    onChangePassword,
    onChangePhoneNum,
    onChangeAddress,
    onChangeMail,
    submitData,
  } = useContext(context);

  // const API_URL = "http://localhost:3010/User";
  const { Option } = Select;

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={props.handleOk}
      confirmLoading={props.confirmLoading}
      onCancel={props.handleCancel}
    >
      <div className="register-form">
        <Input
          name="fullname"
          onChange={(e) => {
            onChangeFullName(e);
          }}
          type="text"
          placeholder="Nhập họ tên ..."
        />
        {errorFullname ? (
          <Alert
            style={{ marginBottom: "15px" }}
            message="please type your fullname"
            type="error"
            showIcon
          />
        ) : (
          <Alert
            style={{ marginBottom: "15px" }}
            message="OK"
            type="success"
            showIcon
          />
        )}
        <label>Ngày tháng năm sinh:</label>
        <br />
        <Space className="birth_select" direction="horizontal">
          <DatePicker
            onChange={(e) => {
              onChangeBirth(e);
            }}
            className="date_picker"
            placeholder="Chọn ngày sinh ..."
          />
          {errorBirth ? (
            <Alert
              style={{ marginBottom: "15px", height: "30px", width: "200px" }}
              className="alert_message"
              message="Please choose your birth"
              type="error"
              showIcon
            />
          ) : (
            <Alert
              style={{ marginBottom: "15px", height: "30px", width: "200px" }}
              className="alert_message"
              message="OK"
              type="success"
              showIcon
            />
          )}
        </Space>
        <br />

        <Input
          onChange={(e) => {
            onChangePhoneNum(e);
          }}
          placeholder="Nhập số điện thoại ..."
        />
        {errorPhoneNum ? (
          <Alert
            style={{ marginBottom: "15px" }}
            className="alert_message"
            message="Please type your phone number al least 9 number"
            type="error"
            showIcon
          />
        ) : (
          <Alert
            style={{ marginBottom: "15px" }}
            className="alert_message"
            message="OK"
            type="success"
            showIcon
          />
        )}

        <Input
          onChange={(e) => {
            onChangeAddress(e);
          }}
          placeholder="Nhập địa chỉ ..."
        />
        {errorAddress ? (
          <Alert
            className="alert_message"
            style={{ marginBottom: "15px" }}
            message="Please type your address"
            type="error"
            showIcon
          />
        ) : (
          <Alert
            style={{ marginBottom: "15px" }}
            className="alert_message"
            message="OK"
            type="success"
            showIcon
          />
        )}
        <Input
          onChange={(e) => {
            onChangeMail(e);
          }}
          placeholder="Nhập email ..."
        />
        {errorsMail ? (
          <Alert
            className="alert_message"
            message="Invalid email"
            type="error"
            showIcon
          />
        ) : (
          <Alert
            className="alert_message"
            message="OK"
            type="success"
            showIcon
          />
        )}

        <Input
          onChange={(e) => {
            onChangeUsername(e);
          }}
          placeholder="Nhập tên người dùng ..."
        />
        {errorUsername ? (
          <Alert
            style={{ marginBottom: "15px" }}
            className="alert_message"
            message="Please tyep your username"
            type="error"
            showIcon
          />
        ) : (
          <Alert
            style={{ marginBottom: "15px" }}
            className="alert_message"
            message="OK"
            type="success"
            showIcon
          />
        )}
        <Input
          onChange={(e) => {
            onChangePassword(e);
          }}
          type="password"
          placeholder="Nhập mật khẩu ..."
        />
        <br />
        {errorPassword ? (
          <Alert
            style={{ marginBottom: "15px" }}
            className="alert_message"
            message="Please type your password..."
            type="error"
            showIcon
          />
        ) : (
          <Alert
            style={{ marginBottom: "15px" }}
            className="alert_message"
            message="OK"
            type="success"
            showIcon
          />
        )}
        <Button
          onClick={(e) => {
            submitData(e);
          }}
          type="primary"
        >
          Đăng ký
        </Button>
      </div>
    </Modal>
  );
}
export default SignUp;
