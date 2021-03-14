const CategoryService = require("../Service/CategoryService");
class CategoryController{
    static async addCategoryController(req,res,next){
        try{
            let result = await CategoryService.addCategoryService(req);
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
                    message:"Add product failed"
                },
                data:null
            })
        }
    }
    static async showCategoryController(req,res,next){
        try{
            let data = await CategoryService.showCategoryService(req);
            
            res.status(200).json(data)
            
               
                
        }catch(e){
            res.status(200).json({
                status:"FAILED",
                error:{
                    code:1000,
                    message:"Show product failed"
                },
                data:null
            })
        }
    }
    static async showCategoryByIdController(req,res,next){
        let data= await CategoryService.showCategoryById(req);
        res.status(200).json(data);
    }
}
module.exports = CategoryController;