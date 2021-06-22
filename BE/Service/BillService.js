const querryBuilder = require("../config/databse");
const uuid = require("uuid");
const { queryBuilder } = require("../config/databse");

class BillService {
  static async addBillService(req, res, next) {
    try {
      const { cart, user, note, total, address, phone } = req.body;
      let billInsert = {
        idBill: uuid.v4(),
        idUser: user || "",
        address: address || "",
        phone: phone || "",
        note: note || "",
        total: total || 0,
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
        return {...productInf, count: item.count};
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
      let data = await querryBuilder("Bill").select().orderBy("created_at","desc");
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async getMonthKPIService(req, res, next) {
    try {
      const { total, result } = req.body;
      const insertData = {
        id: uuid.v4(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        result: result || 0,
        total: total || 0,
      };
      await querryBuilder("KPI").insert(insertData);
      return "KPI updated";
    } catch (e) {
      console.log(e);
    }
  }
  static async GetAllMonthKPIYearService(req, res, next) {
    try {
      const { year } = req.query;
      const data = await querryBuilder("KPI").where("year", year).select();
      return data
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = BillService;
