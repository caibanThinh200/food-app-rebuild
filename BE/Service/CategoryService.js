const uuid = require("uuid");
const querryBuilder = require("../config/databse");
const querry = require("../config/databse");
class CategoryService {
  static async addCategoryService(req, res, next) {
    try {
      let data = req.body;
      console.log(req.file);
      console.log(data);
      let insertData = {
        idCategory: uuid.v4(),
        nameCategory: data.name,
        icon: req.file.filename,
      };
      await querryBuilder("category").insert(insertData);
      return "Category added";
    } catch (e) {
      console.log(e);
    }
  }
  static async showCategoryService(req, res, next) {
    try {
      let data = await querryBuilder("category").select();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async showCategoryById(req, res, next) {
    try {
      let param = req.params;

      let data = await querryBuilder("category")
        .where("idCategory", param.id)
        .select();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = CategoryService;
