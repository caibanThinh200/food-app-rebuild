const route = require("express").Router();
const ProductController = require("../Controller/ProductController");
const multer = require("multer");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images/");
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const upload = multer({storage:storage});

route.post("/",upload.single("image"),ProductController.createProductController);
route.put("/:id", upload.single("image"), ProductController.updateProductController);
route.get("/",ProductController.showFoodController);
route.get("/idFood/:idFood",ProductController.showFoodByIdController);
route.get("/:idCate",ProductController.showFoodByCateController);
route.get("/search/searchFood",ProductController.searchFoodController);
route.get("/search/searchAddress",ProductController.searchAddressController);
route.post("/images",upload.single("image"),ProductController.postImageOfProductController)
route.get("/images/:id",ProductController.getImagesOfProductController);
route.put("/submit",ProductController.increaseProductController);
route.get("/b/bestSaled",ProductController.getProductBestSaledController);

module.exports = route;