import React,{useContext, useEffect, useState} from 'react';
import {Input,Button,Modal,Image, Carousel,DatePicker,Alert,notification,Space,Select,} from "antd"
import { context } from "../Context/Context";
import axios  from "axios";
import { Link,Route } from "react-router-dom";
import SlideRoutes from 'react-slide-routes';
import Login from "./Login";
import Register from "./Register";
import 'antd/dist/antd.css';
import { useLocation } from 'react-router-dom';
function SignIn(props){
  
    const {visible,setVisible,fullname,
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
        submitData,submitLogin} =useContext(context);
        const location = useLocation();
        
        return(
        <Modal
              
                  title={props.title}
                  visible={props.visible}
                  onOk={props.handleOk}
                  confirmLoading={props.confirmLoading}
                  onCancel={props.handleCancel}
                >
               
               
               <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                    Login 
                    <li data-target="#carouselExampleIndicators" onClick={()=>props.changeTextLogin()} data-slide-to="1" className="active"></li>
                    Sign up
                    <li data-target="#carouselExampleIndicators" onClick={()=>props.changeTextRegister()} data-slide-to="0"></li>
                    
                  </ol>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img style={{width:"100px", height:"100px",marginLeft:"40%"}} src={process.env.PUBLIC_URL + '/[removal.ai]_tmp-601c00a249770.png'} alt="First slide" width="30px" height="30px"/>
                          <h1 className="user-title">Register User</h1>
                          <div className="register-form">
                                  
                                    <Input name="fullname" onChange={(e)=>{onChangeFullName(e)}} type="text"  placeholder="Nhập họ tên ..."/>
                                    
                      
                                    <Space className="birth_select" direction="horizontal">
                                        <DatePicker onChange={(e)=>{onChangeBirth(e)}} className="date_picker"  placeholder="Chọn ngày sinh ..."  />
                                      
                                    </Space><br/>    
                                        
                              
                                        
                                    <Input onChange={(e)=>{onChangePhoneNum(e)}} placeholder="Nhập số điện thoại ..."/>
                                    
                                    
                                    <Input onChange={(e)=>{onChangeAddress(e)}} placeholder="Nhập địa chỉ ..."/>
                                    
                                    <Input onChange={(e)=>{onChangeMail(e)}} placeholder="Nhập email ..."/>
                                    

                                    <Input onChange={(e)=>{onChangeUsername(e)}} placeholder="Nhập tên người dùng ..."/>
                                    
                                    <Input onChange={(e)=>{onChangePassword(e)}} type="password" placeholder="Nhập mật khẩu ..."/><br/>
                                    
                                    <Button onClick={(e)=>{submitData(e)}} type="primary">Register</Button>
                                </div>
                                </div>
                                  <div className="carousel-item">
                                  <img style={{width:"100px", height:"100px",marginLeft:"40%"}} src={process.env.PUBLIC_URL + '/[removal.ai]_tmp-601c00a249770.png'} alt="First slide" width="30px" height="30px"/>
                                  <h1 className="user-title">Login User</h1>
                                          <div className="register-form">
                                                <Input onChange={(e)=>{onChangeUsername(e)}} placeholder="Nhập tên người dùng ..."/>
                                                    
                                                <Input onChange={(e)=>{onChangePassword(e)}} type="password" placeholder="Nhập mật khẩu ..."/><br/>
                                                    
                                                <Button onClick={(e)=>{
                                                  submitLogin(e);
                                                  props.disable();
                                                 }} type="primary">Login</Button>
                                                {errorLogin&&<Alert style={{width:"70%",margin:"30px 60px"}} message="Invalid username or password" type="error" showIcon />}
                                            </div>
                                        </div>
                      
                                        </div>
                                       
                                      </div>
                </Modal>
    )
}
export default SignIn
                                                
                                               