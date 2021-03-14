import {Route,Link,BrowserRouter as Router} from "react-router-dom"
import { Button, Input, Modal, Image,Carousel,Dropdown,Menu,message ,notification} from "antd";
import { DownOutlined, UserOutlined ,LogoutOutlined, MoneyCollectFilled} from '@ant-design/icons';
import React,{ useContext, useEffect, useState } from "react";
import { context } from "../Context/Context";
import Item from "antd/lib/list/Item";
import Login from "./Login";
import Register from "./Register";
import SlideRoutes from 'react-slide-routes';
import { useJwt } from "react-jwt";

const{Search} = Input
function Header(props){
    
    const{
      API_URL,product,productFilled,setProduct,getProduct,isLoading,setIsLoading,cart,
      search,setSearch,
      visible,setVisible,
      confirmLoading,setConfirmLoading,
      modalText,setModalText,
      showModal,handleCancel,handleOk,
      onChangeSearch,searchAction
    } = useContext(context);
   
    
   
    const [userInf,setUserInf] = useState([])
    const token = JSON.parse(localStorage.getItem("token"))||"";

     const{isExpired,decodedToken} = useJwt(token.token)
   
     
 
 
    const getUserInfo = () =>{
      //console.log(isExpired);
      if(token){
        
        if(!isExpired){
        fetch(API_URL + "/User/s/userprofile",{
        headers:{
          "Authorization":"Bearer " + token.token
        }
      })
      .then(res => res.json())
      .then(json => setUserInf(json));
      
        }
        else if(isExpired){
          alert("Token expired,please login again")
          showModal();
           
          }
      }
      
    }  
      
     
   
    const disable = () =>{
      setVisible(false)
    }
    const logout = () =>{
      localStorage.removeItem("token")
      setUserInf([]);
      notification.open({
        message:"Logout",
        description:"You have logout"
        })
      showModal();
    }     
   const changeTextRegister = ()=>{
     
      setModalText("Register")
    }
    const changeTextLogin = () =>{
      setModalText("Login")
    }
   
    useEffect(()=>{
      
      getProduct();
    },[])
    useEffect(()=>{
      getUserInfo();
    
    },[token.token])   
    
    const menu = (id)=> (
      <Menu style={{width:"100px"}} >
        <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to={"profile/"+id}>Profile</Link>
      
        </Menu.Item>
        <Menu.Item key="2" icon={<MoneyCollectFilled/>}>    
        <Link to={"/bill"}>List bill</Link>
         
        </Menu.Item>
        <Menu.Item onClick={()=>logout()} key="3" icon={<LogoutOutlined />} >
          Logout
        </Menu.Item>
      </Menu>
    );
        return(
        
        
            <nav className="nav-menu">
                
              
                <img id="uber-logo" src={process.env.PUBLIC_URL + '/[removal.ai]_tmp-601c00a249770.png'} /> 
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/product">Product</Link>
                <Link className="link" to="/cart">Cart ({cart[0].length})</Link>
                <Link className="link" to="/about">About</Link>
                <Link className="link" to="/contact">Contact</Link>
               
     
                {!isExpired?<span style={{marginLeft:"35%" ,width:"100px"}}>
                  {
                   decodedToken&&<Dropdown.Button style={{float:"right"}}  size="large"  overlay={menu(decodedToken.id)} key={decodedToken.id}>Hello {decodedToken.username}</Dropdown.Button>
                  }
                </span>:<>
                
                <Button type="primary" className="link" style={{float:"right"}} onClick={showModal}>
                  Don't have user? Click here
                </Button>
                 <Login changeTextRegister={()=>changeTextRegister()} changeTextLogin={()=>changeTextLogin()} visible={visible} disable={()=>disable()} handleOk={handleOk} confirmLoading={confirmLoading} handleCancel={handleCancel} title={modalText}/>
                </>
                }
                 <div style={{marginRight:"30px",width:"300px",height:"100%"}} className="floatLeft search-container">
                 
                </div>
            </nav>
            )
        }
        export default Header           
                
               
                
      
     
    
      
     
    
       
        
       
    