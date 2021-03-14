const uuid = require("uuid");
const bcrypt = require("bcrypt");
const querryBuilder = require("../config/databse");
const { search } = require("../app");
const { as } = require("../config/databse");


class ProductService{
    static async createProductService(req,res,next){
        try{
        let data = req.body;
        let insertData = {
            idProduct:uuid.v4(),
            idCategory:data.idCate,
            nameFood:data.nameFood,
            price:data.price,
            foodAdress:data.address,
            image:req.file.filename,
            created_at:new Date(),
            
        }
        console.log(req.file)
        //await querryBuilder("product").insert(insertData);
        return "Add product success";
        }catch(e){
            console.log(e);
        }
    }
    static async showFoodById(req,res,next){
        try{
            let param = req.params.idFood;
      
            let data = await querryBuilder("product").where("idProduct",param).select();

            return data;
        }catch(e){
            console.log(e);
        }
    }
    static async showFoodByCateService(req,res,next){
        try{
            let param = req.params.idCate;
         
            let data = await querryBuilder("product").where("idCategory",param).select();
            
            return data;
        }catch(e){
            console.log(e);
        }
    }
    static async showFoodService(req,res,next){
        try{
            let data = await querryBuilder("product").orderBy("created_at","desc").select();
            
            return data;
        }catch(e){
            console.log(e)
        }
    }
    static async searchFoodService(req,res,next){
        try{
            let data1 = req.query.search;
            console.log(data1)
            
            let data = await querryBuilder("product").where("nameFood",'like',data1+"%").select();
            return data;
        }catch(e){
            console.log(e);
        }
    }
    static async searchAddressService(req,res,next){
        try{
            let require = req.query;
            let data = await querryBuilder("Food").where("foodAddress",require.address).select();
            return data;
        }catch(e){
            console.log(e);
        }
    }
    static async postImageOfProductService(req){
        try{
            let data =req.body;
            
            let images = {
                id:uuid.v4(),
                idProduct:data.idProduct,
                image:req.file.filename
            }
           
            await querryBuilder("imageContainer").insert(images);
            return "Insert image success"
        }
        catch(e){
            console.log(e)
        }
    }
    static async getImagesOfProductService(req){
        try{
            let idProduct = req.params.id
            let images = await querryBuilder("imageContainer").where("idProduct",idProduct).select();
            return images
        }catch(e){
            console.log(e)
        }
    }
    static async increaseProductService(req,res,next){
        try{
            let productSubmit = req.body;
            //console.log(productSubmit);
            productSubmit.forEach(async item =>{
                let productData = await querryBuilder("product").where("idProduct",item.idProduct).select().first();
                let productStringlify = JSON.stringify(productData);
                let product = JSON.parse(productStringlify);
                await querryBuilder("product").where("idProduct",item.idProduct).update("saled",product.count + item.count)
            })
           
            return "increase success"
        }catch(e){
            console.log(e);
        }
    }
    static async getProductBestSaledService(req,res,next){
        try{
            let product = await querryBuilder("product").orderBy("saled","desc").select();
        
            return product;
        }
        catch(e){
            console.log(e);
        }
    }
}
module.exports = ProductService;