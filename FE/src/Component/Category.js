import {HomeOutlined } from "@ant-design/icons";

import { context } from "../Context/Context";
import React,{useContext, useEffect} from 'react';
function Category(props) {
    const{cate,getCate,isLoading,setIsLoading,getProductByCateId} = useContext(context);
    useEffect(()=>{
      
        getCate()
       
      
       
    },[])
  
    
    
    if(cate.length <= 0){
        
    return(
        <div id="cate-container" className="loading">
            <h1>No cate</h1>
        </div>
    )
    }
    else{
    return(
        <div style={{marginTop:"30px"}}>
        <div className="voucher textAlignCenter" style={{marginBottom:"60px"}}>
                    <h1>Category</h1>
                </div>
        <div id="cate-container" className="cate-container textAlignCenter col">
        
            {
                
                cate.length > 0 &&cate.map((value,key)=>
                <div key={key} onClick={()=>{getProductByCateId(value.idCategory)}} className="cate-box floatLeft textAlignCenter">
                <img  className="logo" src={"http://localhost:3010/images/"+value.icon}/>
                <br/>
                <h5>{value.nameCategory}</h5>
                
                </div>
                )
               
            }
            
       
        </div>
        </div>
    )
    }
}
export default Category