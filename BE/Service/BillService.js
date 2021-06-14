const querryBuilder = require("../config/databse");
const uuid = require("uuid");
const { queryBuilder } = require("../config/databse");

class BillService {
  static async addBillService(req, res, next) {
    try {
      const { cart, user, note, total } = req.body;
      console.log(req.body);
      let billInsert = {
        idBill: uuid.v4(),
        idUser: user,
        note: note,
        total: total,
        created_at: new Date(),
      };
      await querryBuilder("Bill").insert(billInsert);

      cart.forEach(async (item) => {
        let cartInsert = {
          idBill: billInsert.idBill,
          idProduct: item.idProduct,
          count: item.count,
        };
        await querryBuilder("productList").insert(cartInsert);
      });
      return "Bill added";
    } catch (e) {
      console.log(e);
    }
  }
  static async showListBillService(req, res, next) {
    try {
      let userId = req.params.id;

      let billData = await querryBuilder("Bill")
        .where("idUser", userId)
        .orderBy("created_at", "desc")
        .select();
      let bill = JSON.parse(JSON.stringify(billData));

      return bill;
    } catch (e) {
      console.log(e);
    }
  }
  static async showProductOfBillService(req, res, next) {
    try {
      let idBill = req.params.id;
      let products = await querryBuilder("productList")
        .where("idBill", idBill)
        .select();

      const product = products.map(async (item) => {
        const productInf = await querryBuilder("product")
          .where("idProduct", item.idProduct)
          .first();
        return productInf;
      });
      const productInPromise = await Promise.all(product);
      return productInPromise;
    } catch (e) {
      console.log(e);
    }
  }

  static async getBillService(req, res, next) {
    try {
      let param = req.params;

      let billinfo = await querryBuilder("Bill")
        .select()
        .where("idBill", param.idBill)
        .first();
      return billinfo;
    } catch (e) {
      console.log(e);
    }
  }
  static async deleteBillService(req, res, next) {
    try {
      let param = req.params;
      let data = await querryBuilder("Bill")
        .select("idBill")
        .where("idBill", param.idBill)
        .first();
      await querryBuilder("Bill").where("idBill", data).delete();
      return "Bill deleted";
    } catch (e) {
      console.log(e);
    }
  }
  static async getAllBillService(req, res, next) {
    try {
      let data = await querryBuilder("Bill")
        .select();
      return data
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = BillService;
