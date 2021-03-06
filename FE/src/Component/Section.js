import React, { useContext } from "react";
import Register from "./Register";
import SlideRoutes from "react-slide-routes";
import Login from "./Login";
import '../App.css'
import HomeHeader from "./HomeHeader"
import  ProductList  from "./ProductList";
import {
  
  Switch,
  Route,
  
} from "react-router-dom";
import Category from "./Category";
import Contact from "./Contact";
import Cart from "./Cart";
import Detail from "./Detail";
import About from "./Service";
import Profile from "./Profile";
import ListBill from "./ListBill";
import BillDetail from "./BillDetail";
import Header from "./Header"
import Admin from "./admin/admin";
import Products from "./admin/product-list";
import AddProduct from "./admin/add-product";
import Chart from "./admin/chart";
import BillAdmin from "./admin/bill-list";


function Section(props){

    
    return(
            <Switch>
                <Route exact path="/admin">
                    <Admin com={<Products/>}/>
                </Route>
                <Route exact path="/admin/add-product">
                    <Admin com={<AddProduct/>}/>
                </Route>
                <Route exact path="/admin/chart">
                    <Admin com={<Chart/>}/>
                </Route>
                <Route exact path="/admin/bill">
                    <Admin com={<BillAdmin/>}/>
                </Route>
                <div>
                <Header/>
                <Route exact path = "/">
                  <HomeHeader />
                 
                  <div className="clear-both "></div>
                  <About/>
                  <div className="clear-both footer-stick"></div>
                  <Contact/>
                </Route>
                
                <Route path="/cart">
                  <div style={{marginTop:"40px"}}> </div>
                  <Cart/>
                  <div className="clear-both footer-stick"></div>
                  <Contact/>
                </Route> 
                <Route className="textAlignCenter" path="/product" exact>
                 <Category  />
                  <div className="clear-both footer-stick"></div>
                  <ProductList/>
                  
                  <div className="clear-both footer-stick"></div>
                  <Contact/>
               
                </Route>
                <Route path="/product/:id">
                  <Detail/>
                  <div className="clear-both footer-stick"></div>
                  <Contact/>
                </Route>

                <Route path="/login">
                  <Login/>
                </Route>
                <Route path="/profile/:id" exact>
                  <Profile/>
                </Route>
               <Route path="/bill" exact>
                 <ListBill/>
                 <div className="clear-both footer-stick"></div>
                 <Contact/>
               </Route>
               <Route path="/bill/:id" >
                 <BillDetail/>
                 <div className="clear-both footer-stick"></div>
                 <Contact/>
               </Route>
                </div>
            </Switch>
      )
} 
  
                   
                
               
            
export default Section
                
                   

            
                
                