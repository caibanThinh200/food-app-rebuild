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
}
module.exports = BillController;
