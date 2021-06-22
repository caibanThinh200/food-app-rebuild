const uuid = require("uuid");
const bcrypt = require("bcrypt");
const querryBuilder = require("../config/databse");
const { search } = require("../app");
const { as } = require("../config/databse");

class ProductService {
  static async createProductService(req, res, next) {
    try {
      let data = req.body;
      let insertData = {
        idProduct: uuid.v4(),
        idCategory: data.idCate,
        nameFood: data.nameFood,
        price: data.price,
        foodAddress: data.address,
        image: req.file.filename,
        created_at: new Date(),
      };
      await querryBuilder("product").insert(insertData);
      return "Add product success";
    } catch (e) {
      console.log(e);
    }
  }
  static async showFoodById(req, res, next) {
    try {
      let param = req.params.idFood;

      let data = await querryBuilder("product")
        .where("idProduct", param)
        .select();

      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async showFoodByCateService(req, res, next) {
    try {
      let param = req.params.idCate;

      let data = await querryBuilder("product")
        .where("idCategory", param)
        .select();

      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async showFoodService(req, res, next) {
    try {
      let data = await querryBuilder("product")
        .orderBy("created_at", "desc")
        .select();
      const parseData = JSON.parse(JSON.stringify(data));
      const categories = parseData.map(async item => {
        const category = await querryBuilder("category").where("idCategory", item.idCategory).first();
        const parseCate = JSON.parse(JSON.stringify(category));
        return { ...item, cateName: parseCate.nameCategory }
      })
      const catePromise = await Promise.all(categories);

      return catePromise;
    } catch (e) {
      console.log(e);
    }
  }
  static async searchFoodService(req, res, next) {
    try {
      let data1 = req.query.search;
      let data = await querryBuilder("product")
        .where("nameFood", "like", data1 + "%")
        .select();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async searchAddressService(req, res, next) {
    try {
      let require = req.query;
      let data = await querryBuilder("product")
        .where("foodAddress", require.address)
        .select();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async updateProductService(req, res, next) {
    let { id } = req.params;
    const data = req.body;
    const filename = req.file ? req.file.filename : "";
    const currentInfo = await querryBuilder("product").where("idProduct", id).select().first();
    const parse = JSON.parse(JSON.stringify(currentInfo));
    console.log(parse); 
    const updateInfo = {
      idCategory: data.idCate || parse.idCategory,
      nameFood: data.nameFood || parse.nameFood,
      price: data.price || parse.price,
      foodAddress: data.address || parse.foodAddress,
      description: data.description || parse.description,
      image: filename || parse.image,
      updated_at: new Date()
    }
    await querryBuilder("product").where("idProduct", id).update(updateInfo);
    return "product updated"
  }
  static async postImageOfProductService(req) {
    try {
      let data = req.body;
      let images = {
        id: uuid.v4(),
        idProduct: data.idProduct,
        image: req.file.filename,
      };
      console.log(images);
      await querryBuilder("imageContainer").insert(images);
      return "Insert image success";
    } catch (e) {
      console.log(e);
    }
  }
  static async getImagesOfProductService(req) {
    try {
      let idProduct = req.params.id;
      let images = await querryBuilder("imageContainer")
        .where("idProduct", idProduct)
        .select();
      return images;
    } catch (e) {
      console.log(e);
    }
  }
  static async increaseProductService(req, res, next) {
    try {
      let productSubmit = req.body;
      //console.log(productSubmit);
      productSubmit.forEach(async (item) => {
        let productData = await querryBuilder("product")
          .where("idProduct", item.idProduct)
          .select()
          .first();
        let productStringlify = JSON.stringify(productData);
        let product = JSON.parse(productStringlify);
        await querryBuilder("product")
          .where("idProduct", item.idProduct)
          .update("saled", product.count + item.count);
      });

      return "increase success";
    } catch (e) {
      console.log(e);
    }
  }
  static async getProductBestSaledService(req, res, next) {
    try {
      let product = await querryBuilder("product")
        .orderBy("saled", "desc")
        .select();

      return product;
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = ProductService;
