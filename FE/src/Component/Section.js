import React, { useContext } from "react";
import Register from "./Register";
import SlideRoutes from "react-slide-routes";
import Login from "./Login";

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



function Section(props){

    
    return(
      
            <Switch>
            
             
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
            </Switch>
      )
} 
  
                   
                
               
            
export default Section
                
                   

            
                
                