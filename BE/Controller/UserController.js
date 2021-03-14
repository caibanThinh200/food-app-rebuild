const e = require("express");
const UserService = require("../Service/UserService");
class UserController{
    static async createUserController(req,res,next){
        try{
        let result = await UserService.createUserService(req);
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
                    message:"Sign up failed"
                },
                data:null
            })
        }
    }
    static async getUserInfoByParamController(req,res,next){
        try{
            let data = await UserService.getUserInfoByParamService(req);
          
            res.status(200).json({
                status:"SUCCESS",
                error:null, 
                data:data
            })
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Get user info failed"
                },
                data:null
            })
        }
    }
    static async loginController(req,res,next){
        try{
            let data= await UserService.loginService(req);
          
            if(data.token){
               
                res.status(200).json({token:data.token});
               
            }
            else res.status(200).json("Error: "+ data)
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Login failed"
                },
                data:null
            })
        }
    }
    static async getUserInfoController(req,res,next){
        try{
            let data = await UserService.getUserInfoService(req);
            res.status(200).json(data);
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Get user failed"
                },
                data:null
            });
        }
    }
    static async getListUserController(req,res,next){
        try{
            let data = await UserService.showListUserService(req);
            res.status(200).json(data)
        }catch(e){
            console.log(e);
        }
    }
    static async getUsernameController(req,res,next){
        try{
           
            let data = await UserService.getUsernameService(req);
            
            res.status(200).json(data);
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    e:e,
                    code:1000,
                    message:"Get user failed"
                },
                data:null
            });
        }
    }
    static async changeAvatarController(req,res,next){
        try{
            let data = await UserService.changeAvatarService(req);
            res.status(200).json({
                status:"SUCCESS",
                error:null,
                data:data
            })
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    e:e,
                    code:1000,
                    message:"Upload image failed"
                },
                data:null
            });
        }
    }
}
module.exports = UserController;