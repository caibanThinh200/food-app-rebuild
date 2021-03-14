const CartService = require("../Service/CartService");
const nodemailer = require('nodemailer');
const Mail = require("nodemailer/lib/mailer");
class CartController{
    static async addProductController(req,res,next){
        try{
            let result = await CartService.addProductService(req);
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                data:result
            })
            let transporter = nodemailer.createTransport({
                host:'smtp.gmail.com',
                service:"Gmail",
                port:587,
                secure:false,
                Auth:{
                    username:"role1thn@gmail.com",
                    pass:"01224659503"
                }
            });
            transporter.verify(function(error, success) {
                // Nếu có lỗi.
                if (error) {
                    console.log(error);
                } else { //Nếu thành công.
                    console.log('Kết nối thành công!');
                }
            });
            let mailOptopns = {
                from:"role1thn@gmail.com",
                to:"role1th@gmail.com",
                subject:"Hello",
                text:"aloooooo"
            }
            transporter.sendMail(mailOptopns,(err,mail)=>{
                if(err)
                    console.log("error: " + err);
                if(mail) 
                    console.log(mail);
            })
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"added failed"
                },
                data:null
            })
        }
    }
    static async showProductController(req,res,next){
        try{

            let result = await CartService.showProductService(req);
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                data:result
            })
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"show product failed"
                },
                data:null
            })
        }
    }
    static async deleteAllProductController(req,res,next){
        try{

            let result = await CartService.deleteAllProductService(req);
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                data:result
            })
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"delete product failed ",
                    detail:e
                },
                data:null
            })
        }
    }
    static async deleteProductController(req,res,next){
        try{

            let result = await CartService.deleteProductService(req);
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                data:result
            })
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"delete product failed"
                },
                data:null
            })
        }
    }
} 
module.exports = CartController;