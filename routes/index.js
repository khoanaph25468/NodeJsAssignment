var express = require("express");
var router = express.Router();

var homeCtrl = require("../controllers/sanpham_controller");
router.get("/", homeCtrl.list);

// var multer = require("multer");
// var objUpload = multer({ dest: "./tmp" });
// router.post("/", objUpload.single("file_anh"), homeCtrl.index);

module.exports = router;
