const ProductService = require("../Service/ProductService");
class ProductController {
  static async createProductController(req, res, next) {
    try {
      let result = await ProductService.createProductService(req);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        data: result,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "Add product failed",
          detail: e,
        },
        data: null,
      });
    }
  }
  static async showFoodByIdController(req, res, next) {
    try {
      let data = await ProductService.showFoodById(req);
      res.status(200).json(data);
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "show product failed",
        },
        data: null,
      });
    }
  }
  static async showFoodByCateController(req, res, next) {
    try {
      let data = await ProductService.showFoodByCateService(req);
      res.status(200).json(data);
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "show product failed",
        },
        data: null,
      });
    }
  }
  static async showFoodController(req, res, next) {
    try {
      let data = await ProductService.showFoodService(req);
      res.status(200).json(data);
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "show product failed",
        },
        data: null,
      });
    }
  }
  static async searchFoodController(req, res, next) {
    try {
      let data = await ProductService.searchFoodService(req);
      res.status(200).json(data);
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "search product failed",
        },
        data: null,
      });
    }
  }
  static async searchAddressController(req, res, next) {
    try {
      let data = await ProductService.searchAddressService(req);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        data: data,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "search address failed",
        },
        data: null,
      });
    }
  }
  static async postImageOfProductController(req, res, next) {
    try {
      let data = await ProductService.postImageOfProductService(req);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        data: data,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "insert image failed" + e,
        },
        data: null,
      });
    }
  }
  static async getImagesOfProductController(req, res, next) {
    try {
      let data = await ProductService.getImagesOfProductService(req);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        data: data,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "get image failed" + e,
        },
        data: null,
      });
    }
  }
  static async increaseProductController(req, res, next) {
    try {
      let result = await ProductService.increaseProductService(req);
      res.status(200).json({
        status: "SUCCESS",
        error: null,
        result: result,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "increase failed" + e,
        },
        data: null,
      });
    }
  }
  static async getProductBestSaledController(req, res, next) {
    try {
      let product = await ProductService.getProductBestSaledService(req);

      res.status(200).json({
        status: "SUCCESS",
        error: null,
        data: product,
      });
    } catch (e) {
      res.status(200).json({
        status: "FAILED",
        error: {
          code: 1000,
          message: "get product failed" + e,
        },
        data: null,
      });
    }
  }
}
module.exports = ProductController;
