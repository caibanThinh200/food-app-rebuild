const route = require("express").Router();
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
const CategoryController = require("../Controller/CategoryController");

route.post("/",upload.single("icon"),CategoryController.addCategoryController);
route.get("/",CategoryController.showCategoryController);
route.get("/:id",CategoryController.showCategoryByIdController);

module.exports = route;