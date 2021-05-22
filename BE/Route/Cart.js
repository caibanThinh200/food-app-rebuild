const route = require("express").Router();
const CartController = require("../Controller/CartController");
const auth = require("../middleware/Auth");
route.post("/", auth, CartController.addProductController);
route.get("/", CartController.showProductController);
route.delete("/delete", CartController.deleteAllProductController);
route.delete("/d/:idCart", CartController.deleteProductController);
module.exports = route;
