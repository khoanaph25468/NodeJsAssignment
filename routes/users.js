var express = require("express");
var router = express.Router();
var userCtrl = require("../controllers/user_controller");
var check_login = require("../middlewaer/check_login");

router.get("/", userCtrl.user);
// router.get("/changepass", userCtrl.password);
// router.get("/info", userCtrl.info);
// router.get("/add-user", userCtrl.addUser);
// router.post("/add-user", userCtrl.addUser);
router.use((req, res, next) => {
  console.log("=======> Đã gọi middlware ===> ", Date.now());
  next();
});
router.get("/", check_login.yeu_cau_dang_nhap, function (req, res, next) {
  // danh sách user
  console.log("Hiển thị danh sách user");

  // hiển thị user đã login
  console.log(req.session.userLogin);
  res.send(req.session.userLogin);
  res.redirect("/");
});

router.get("/add", (req, res, next) => {
  console.log("add user ");
  res.send("Chức năng add");
});

router.get("/reg", userCtrl.Reg);
router.post("/reg", userCtrl.Reg);

router.get("/reg", check_login.yeu_cau_dang_nhap, userCtrl.Reg);
router.post("/reg", check_login.yeu_cau_dang_nhap, userCtrl.Reg);

router.get("/login", check_login.khong_yc_dang_nhap, userCtrl.Login);
router.post("/login", check_login.khong_yc_dang_nhap, userCtrl.Login);

router.get("/delete/:iduser", userCtrl.deleteuser);
router.post("/delete/:iduser", userCtrl.deleteuser);


module.exports = router;
