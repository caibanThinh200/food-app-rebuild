const uuid = require("uuid");

const querryBuilder = require("../config/databse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("express");
const { use } = require("../Route/Bill");
const { insert } = require("../config/databse");

const JWT_SECRET_KEY = "mysecretkey";
class UserService {
  static getCookieService(cname, req) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(req.headers.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  static async showListUserService(req, res, next) {
    try {
      let data = querryBuilder("Users").select();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  static async createUserService(req, res, next) {
    try {
      let data = req.body;
      console.log(data);
      let insertData = {
        UserId: uuid.v4(),
        Username: data.username,
        Pass: bcrypt.hashSync(data.pass, 10),
        Fullname: data.Fullname,
        UserAddress: data.UserAddress,
        Birth: data.Birth,
        Gmail: data.Gmail,
        phoneNum: data.PhoneNum,
        Created_at: new Date(),
      };

      await querryBuilder("users").insert(insertData);
      return "Sign up success";
    } catch (e) {
      console.log(e);
    }
  }
  static async loginService(req, res, next) {
    try {
      let data = req.body;

      let user = await querryBuilder("users")
        .select()
        .where("username", data.username)
        .first();

      if (user) {
        if (
          !data.username ||
          !bcrypt.compareSync(data.pass, user.Pass) ||
          !data.pass
        ) {
          return "Sai tên đăng nhập hoặc mật khẩu";
        } else {
          const token = jwt.sign(
            {
              id: user.UserId,
              username: user.Username,
              fullname: user.Fullname,
              address: user.UserAddress,
              birth: user.Birth,
              gmail: user.Gmail,
            },
            JWT_SECRET_KEY,
            { expiresIn: 60 * 60 * 8 }
          );

          return { token: token };
        }
      } else return "Sai tên đăng nhập hoặc mật khẩu";
    } catch (e) {
      console.log(e);
    }
  }
  static async getUserInfoByParamService(req, res, next) {
    try {
      const userId = req.params.id;

      let userData = await querryBuilder("users").where("UserId", userId);
      return userData;
    } catch (e) {
      console.log(e);
    }
  }
  static async getUserInfoService(req, res, next) {
    try {
      let token = req.header("Authorization").replace("Bearer ", "");

      if (token) {
        let checkToken = jwt.verify(token, JWT_SECRET_KEY);

        let data = await querryBuilder("users")
          .where("UserId", checkToken.id)
          .select();

        return data;
      } else {
        return "";
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getUsernameService(req, res, next) {
    try {
      // let token = req.header("Authorization").replace('Bearer ','');
      // let checkToken = jwt.verify(token,JWT_SECRET_KEY);

      //console.log(req.headers.cookie);

      let token = this.getCookieService("token", req);

      if (token) {
        let checkToken = jwt.verify(token, JWT_SECRET_KEY);
        //console.log(checkToken);
        let data = await querryBuilder("users")
          .where("UserId", checkToken.id)
          .select("Fullname");
        return data;
      } else {
        return "";
      }
    } catch (e) {
      console.log(e);
    }
  }
  static async changeAvatarService(req, res, next) {
    try {
      const avatar = req.file.filename;

      await querryBuilder("users").update("avatar", avatar);

      return "Uploaded ";
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = UserService;
