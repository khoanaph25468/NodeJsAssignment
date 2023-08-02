var express = require("express");
var router = express.Router();
var spCtrl = require("../controllers/sanpham_controller");
var myModel = require("../Models/sanpham.model");


router.get("/add", spCtrl.add);

router.get("/add-sp", spCtrl.addSP);
router.post("/add-sp", spCtrl.addSP);

router.get("/edit/:idsp", spCtrl.editSP);
router.post("/edit/:idsp", spCtrl.editSP);

router.get("/delete/:idsp", spCtrl.deleteSp);
router.post("/delete/:idsp", spCtrl.deleteSp);
module.exports = router;
