const express = require("express");
const route = express.Router();
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

const UserController = require("../Controller/UserController");
route.get("/",UserController.getListUserController);
route.post("/",UserController.createUserController);
route.post("/login",UserController.loginController);
route.get("/:id",UserController.getUserInfoByParamController);
route.get("/s/userprofile",UserController.getUserInfoController);
route.put("/profile/:id",upload.single("file"),UserController.changeAvatarController);

module.exports = route;