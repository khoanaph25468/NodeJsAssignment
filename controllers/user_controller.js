exports.user = (req, res, next) => {
  res.render("user/user");
};
const bcrypt = require("bcrypt"); // thư viện mã hoá
// exports.info = (req, res, next) => {
//   res.render("user/sign");
// };

// exports.password = (req, res, next) => {
//   res.render("user/changepass");
// };
const myModel = require("../Models/uesr.model");
exports.Reg = async (req, res, next) => {
  let msg = "";
  if (req.method == "POST") {
    console.log("day là dang ky");
    console.log(req.body);
    if (req.body.passwd != req.body.passwd2) {
      msg = "Xác nhận password không đúng";
      return res.render("user/sign", { msg: msg });
    }
    let objU = new myModel.UserModel();
    objU.username = req.body.username;

    // xử lý mã hoá
    // tạo chuỗi mã hoá
    const salt = await bcrypt.genSalt(15);
    console.log("chuỗi ngẫu nhiên=" + salt);
    objU.passwd = await bcrypt.hash(req.body.passwd, salt);

    //objU.passwd = req.body.passwd2;
    objU.email = req.body.email;
    try {
      await objU.save();
      console.log("Đăng ký thành công");
      msg = "Đăng ký thành công";
    } catch (error) {
      msg = "Lỗi " + error.message;
    }
  }

  res.render("user/sign", { msg: msg });
};
exports.Login = async (req, res, next) => {
  let msg = "";
  if (req.method == "POST") {
    console.log(req.body);
    try {
      let objU = await myModel.UserModel.findOne({
        username: req.body.username,
      });

      console.log(objU);

      if (objU != null) {
        let check_password = await bcrypt.compare(req.body.passwd, objU.passwd);
        if (check_password) {
          //   if (objU.passwd == req.body.passwd) {
          req.session.userLogin = objU;

          return res.redirect("/users");
        } else {
          msg = "Sai password";
        }
      } else {
        msg = "Không tồn tại tài khoản";
      }
    } catch (error) {
      msg = "Lỗi " + error.message;
    }
  }

  res.render("user/login", { msg: msg });
};
exports.Logout = (req, res, next) => {};

exports.user = async (req, res, next) => {
  let dieu_kien = null;

  if (typeof req.query.username != "undefined") {
    let username = req.query.username;
    dieu_kien = { username: username };
  }
  var user = await myModel.UserModel.find(dieu_kien).sort({ username: 1 });
  res.render("user/user", { user: user });
};
exports.deleteuser = async (req, res, next) => {
  
  var id =req.params.iduser
  console.log(id);
    try{
      await myModel.UserModel.findByIdAndDelete(id);
      console.log("xoá thành công");
      return res.redirect('/user')
    }catch(error){
  console.log(error);
  
    }
  
  };
