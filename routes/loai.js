var express = require("express");
var router = express.Router();

var loaiCtrl = require("../controllers/sanpham_controller");
router.get("/", loaiCtrl.loai);

router.get("/add-tl", loaiCtrl.addTL);
router.post("/add-tl", loaiCtrl.addTL);

// router.get("/edit/:idtl", loaiCtrl.editTL);
// router.post("/edit/:idtl", loaiCtrl.editTL);

router.get("/delete/:idtl", loaiCtrl.deleteTL);
router.post("/delete/:idtl", loaiCtrl.deleteTL);
module.exports = router;
