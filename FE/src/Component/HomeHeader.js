import React,{useEffect,useState} from "react"
import { Radio,Button } from "antd";
const orderComp = () =>{
    window.location = "/product"
}
function HomeHeader(props){
    let [slidePos,setSlidePos] = useState(1);
   
    const {Button,Group} = Radio;
    const descriptionShow = (n) =>{
        
        let descrip = document.getElementsByClassName("header-description")[0];
        
        if(n==1){
        
            let description = `<h1>Discover new food on our app</h1><br/>
            <h4>We give to you all the food from the restaurant that you love explore new foods</h4>
            <button  className="btn btn-primary">Order now</button>
            ` ;
            descrip.innerHTML = description
        }
        if(n==2){
            let description = `<h1>Be one of our employees</h1><br/>
            <h4>Uber for Business helps to simplify business travel, expensing, and customer experiences.</h4>
            <button className="btn btn-primary">Register now</button>`
            
            descrip.innerHTML = description
        }   
        if(n==3){
            let description = `<h1>Request a ride now</h1><br/>
            <h4>Greater transparency for shippers and carriers to do business together.</h4>
            <button className="btn btn-primary">Book now</button>`
            
            descrip.innerHTML = description
        }   
    }
    const slideShow = (n) =>{
        descriptionShow(n)
        let contents = document.getElementsByClassName("header-image");
        
        if(n > contents.length) 
        n=1
        if(n<1)
        n = contents.length;
        for(let i = 0; i < contents.length;i++){
            contents[i].style.display = "none";
        }
      
        contents[n-1].style.display = "block";
        setTimeout(()=>{
            //console.log(slidePos);
            if(slidePos >= contents.length)
            setSlidePos(0);
            else{
                let group_btn = document.getElementsByClassName("ant-radio-button-wrapper");
                if(slidePos==0){
                    group_btn[0].classList.add("ant-radio-button-wrapper-checked");
                    group_btn[1].classList.remove("ant-radio-button-wrapper-checked")
                    group_btn[2].classList.remove("ant-radio-button-wrapper-checked")
                }
                if(slidePos == 1){
                    group_btn[1].classList.add("ant-radio-button-wrapper-checked")
                    group_btn[2].classList.remove("ant-radio-button-wrapper-checked")
                    group_btn[0].classList.remove("ant-radio-button-wrapper-checked")
                }
                if(slidePos == 2){
                    group_btn[2].classList.add("ant-radio-button-wrapper-checked")
                    group_btn[0].classList.remove("ant-radio-button-wrapper-checked")
                    group_btn[1].classList.remove("ant-radio-button-wrapper-checked")
                }
                //console.log(group_btn.defaultValue);
            
                setSlidePos(slidePos+1);
            }
            
        },5000)
        
    }
    const nextSlide = (n)=>{
        slideShow(slidePos+n);
    }
   useEffect(()=>{
       slideShow(slidePos)
        return false
   })
    return(
        <div className="head-container">
            <div className="row">
                
                <div className="col-left ">
                    
                    <div className="header-title">
                        <h1>Helping to keep each other safe</h1>
                        <h4>We’re actively monitoring the COVID-19 situation and are continually working to help keep those who rely on our platform healthy and safe.</h4>
                    </div>
                  
                    <div className="header-description"></div>
                </div>  
                <div className="col-right">
                    <div className="header-content ">
                        <div className="header-image">
                            <img src="https://www.brandchannel.com/wp-content/uploads/2017/07/McDonalds_Canada_UberEATS_launch_July_2017.jpg"/>
                        </div>
                    
                
                        <div className="header-image">
                        
                            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1571089524/assets/86/deebcb-1975-4c81-96b7-7b126fe2f0f3/original/UberEatsOffers.png"/>
                        </div>
                
                
                        <div className="header-image">
                            <img src="https://southsoundmag.com/wp-content/uploads/2017/02/UberEATS-image2.jpg"/>
                        </div>
                    
            
                        <Group buttonStyle="solid" id="group" defaultValue="1" >
                            <Button style={{width:"auto"}} onClick={(e)=>{slideShow(1)}} value="1" className="slide-btn">Discover new food</Button>
                            <Button style={{width:"auto"}} onClick={(e)=>{slideShow(2)}} value="2" className="slide-btn">Join our team</Button>
                            <Button style={{width:"auto"}} onClick={(e)=>{slideShow(3)}} value="3" className="slide-btn">Request for a ride</Button>
                        </Group> 
                        </div>    
                    </div>
            </div>
         </div>
    )
}
export default HomeHeader                          
                        
                   
         
            
         
               
       
           
           
       