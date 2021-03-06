const BillService = require("../Service/BillService");
class BillController {
  static async addBillController(req, res, next) {
    try {
      let result = await BillService.addBillService(req);
      res.status(200).json({
        status: "SUCCESS",
        data: result,
        error: null,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        data: null,
        error: {
          code: 1000,
          message: "add bill failed",
        },
      });
    }
  }
  static async showBillController(req, res, next) {
    try {
      let data = await BillService.showListBillService(req);
      res.status(200).json({
        status: "SUCCESS",
        data: data,
        error: null,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        data: null,
        error: {
          code: 1000,
          message: "show bill failed",
        },
      });
    }
  }
  static async showProductInBillController(req, res, next) {
    try {
      let data = await BillService.showProductOfBillService(req);

      res.status(200).json({
        status: "SUCCESS",
        data: data,
        error: null,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        data: null,
        error: {
          code: 1000,
          message: "show product failed",
        },
      });
    }
  }
  static async getBillController(req, res, next) {
    try {
      let data = await BillService.showListBillService(req);
      res.status(200).json({
        status: "SUCCESS",
        data: data,
        error: null,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        data: null,
        error: {
          code: 1000,
          message: "get bill failed",
        },
      });
    }
  }
  static async deleteBillController(req, res, next) {
    try {
      let result = await BillService.deleteBillService(req);
      res.status(200).json({
        status: "SUCCESS",
        data: result,
        error: null,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        data: null,
        error: {
          code: 1000,
          message: "delete bill failed",
        },
      });
    }
  }
  static async getAllBillController(req, res, next) {
    try {
      let data = await BillService.getAllBillService(req);
      res.status(200).json({
        status: "SUCCESS",
        data,
        error: null,
      });
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: "FAILED",
        data: null,
        error: {
          code: 1000,
          message: "get bill failed",
        },
      });
    }
  }
  static async getKPIMonthController(req, res, next) {
    try {
      let result = await BillService.getMonthKPIService(req);
      res.status(200).json({
        status: "SUCCESS",
        result,
        error: null,
      });
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: "FAILED",
        data: null,
        error: {
          code: 1000,
          message: "insert KPI failed",
        },
      });
    }
  }
  static async getMonthKPIByYearController(req, res, next) {
    try {
      let data = await BillService.GetAllMonthKPIYearService(req);
      res.status(200).json({
        status: "SUCCESS",
        data,
        error: null,
      });
    } catch(e) {
      res.status(200).json({
        status: "FAILED",
        data: null,
        error: {
          code: 1000,
          message: "get KPI failed",
        },
      });
    }
  }
}
module.exports = BillController;
