import logo from './logo.svg';
import './App.css';
import SignIn from './Component/Register';
import Section from "./Component/Section";
import { context, ContextProvider } from "./Context/Context";
import {BrowserRouter as Router, useLocation} from "react-router-dom"
import SlideRoutes from "react-slide-routes";
import { useContext, useEffect, useState } from 'react';
import Loading from './Component/Loading';
import { SlidersFilled } from '@ant-design/icons';
function App() {
  
  return (
  <ContextProvider>
   
    <div className="App">
      <Router>

      
     <Section/>
     </Router>
    </div>
  </ContextProvider>
  );

}

export default App;
