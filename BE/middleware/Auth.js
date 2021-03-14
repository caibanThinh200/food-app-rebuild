'use strict'
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "mysecretkey";
function getCookieService(cname,req) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(req.headers.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
       
        return c.substring(name.length, c.length);
      
      }
    }
    return "";
  }
module.exports = async (req,res,next) =>{
    const token = req.header("Authorization").replace("Bearer ",'');
  
    let checkToken;
   
    if(token){
  
      checkToken = jwt.verify(token,JWT_SECRET_KEY);
      
    }
    else{
     
      checkToken = false
    }
    try{
         if(!checkToken){
           
           res.status(200).json("You need account to use this function");
        }
        else{
          
          next();
        }
      
    }catch(e){
       console.log( "error"+e);
        res.status(200).json("You need account to use this function");
    }
}
     
    
  
    
       