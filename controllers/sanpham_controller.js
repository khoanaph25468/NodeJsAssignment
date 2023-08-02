// exports.list = (req, res, next) => {
//   res.render("sanpham/list");
// };

// exports.add = (req, res, next) => {
//   res.render("sanpham/add");
// };
// // exports.sp = (req, res, next) => {
// //   res.render("sanpham/sanpham");
// // };
const fs = require("fs");
const myModel = require("../Models/sanpham.model");
const myMD = require("../Models/uesr.model");

exports.list = async (req, res, next) => {
  let dieu_kien = null;

  if (typeof req.query.price != "undefined") {
    let price = req.query.price;
    dieu_kien = { price: price };
  }

  // var list = await myModel.spModel.find(dieu_kien).sort({ name: 1 }); // tìm sp
  var list = await myModel.spModel
    .find(dieu_kien)

    .populate("id_theloai")
    .sort({ name: 1 });
  console.log(list);
  res.render("sanpham/list", { listSp: list });
};

exports.add = async (req, res, next) => {
  var url_image = "";

  console.log(req.method);
  if (req.method == "POST") {
    console.log(req.file, req.body);

    try {
      await fs.rename(
        req.file.path,
        "./public/uploads/" + req.file.originalname
      );

      url_image = "/uploads/" + req.file.originalname;
      console.log("upload thanh cong" + url_image);
    } catch (error) {}
  }

  console.log("send client ");

  res.render("sanpham/themsp", { url_image: url_image });
};

exports.addSP = async (req, res, next) => {
  let msg = "";
  let listTL = await myModel.theloaiModel.find();
  if (req.method == "POST") {
    let objSP = new myModel.spModel();
    objSP.name = req.body.name;
    objSP.price = req.body.price;
    objSP.description = req.body.description;
    objSP.id_theloai = req.body.theloai;

    try {
      let new_sp = await objSP.save();

      console.log(new_sp);
      console.log("quang minh");

      console.log("Đã ghi thành công");
      msg = "Đã thêm thành công";
    } catch (err) {
      console.log(err);
    }
  }

  res.render("sanpham/add", { msg: msg, listtheloai: listTL });
};
exports.loai = async (req, res, next) => {
  let dieu_kien = null;

  if (typeof req.query.name != "undefined") {
    let name = req.query.name;
    dieu_kien = { name: name };
  }
  var loai = await myModel.theloaiModel.find(dieu_kien).sort({ name: 1 });
  res.render("loai/loai", { listTL: loai });
};
exports.addTL = async (req, res, next) => {
  let msg = "";
  let listTL = await myModel.theloaiModel.find();
  if (req.method == "POST") {
    let objTL = new myModel.theloaiModel();
    objTL.name = req.body.name;

    // objSP.id_theloai = req.body.theloai;

    try {
      let new_TL = await objTL.save();

      console.log(new_TL);

      console.log("Đã ghi thành công");
      msg = "Đã thêm thành công";
    } catch (err) {
      console.log(err);
    }
  }

  res.render("loai/addloai", { msg: msg, listTL: listTL });
};
exports.user = async (req, res, next) => {
  let dieu_kien = null;

  if (typeof req.query.username != "undefined") {
    let username = req.query.username;
    dieu_kien = { username: username };
  }
  var user = await myMD.UserModel.find(dieu_kien).sort({ username: 1 });
  res.render("user/user", { listuser: user });
};
exports.editSP = async (req, res, next) => {
  let msg = ""; // chứa câu thông báo
  // load dữ liệu cũ để hiển thị
  let objSP = await myModel.spModel.findById(req.params.idsp);
  console.log(objSP);

  // lấy danh sách thể loại đưa lên form

  let listTL = await myModel.theloaiModel.find();
  console.log("lôi" + listTL);
  if (req.method == "POST") {
    // xử lý ghi CSDL ở đây
    // kiểm tra hợp lệ dữ liệu ở chỗ này.

    // gán giá trị cho các thuộc tính của objSP
    objSP.name = req.body.name;
    objSP.price = req.body.price;
    objSP.description = req.body.description;
    objSP.id_theloai = req.body.theloai; // thêm dòng này để có thể loại

    try {
      // update dữ liệu
      await objSP.save();

      console.log("Đã ghi thành công");
      msg = "Đã ghi thành công";
    } catch (err) {
      console.log(err);
      msg = "Lỗi " + err.message;
    }
  }

  res.render("sanpham/edit", {
    msg: msg,
    objSP: objSP,
    listTheloai: listTL,
  });
};

// exports.editTL = async (req, res, next) => {
//   let msg = "";
//   let listTL = await myModel.theloaiModel.find();
//   if (req.method == "POST") {
//     let objTL = new myModel.theloaiModel();
//     objTL.name = req.body.name;
//     objTL._id = req.params.idtl;
//     try {
//       // update dữ liệu
//       // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
//       await myModel.theloaiModel.findByIdAndUpdate({
//         _id: req.params.idtl,
//         objTL
//       });

//       console.log("Đã ghi thành công");
//       msg = "Đã ghi thành công";
//     } catch (err) {
//       console.log(err);
//       msg = "Lỗi " + err.message;
//     }
//   }

//   res.render("loai/edittl", {
//     msg: msg,

//     listTheloai: listTL,
//   });
// };
exports.deleteTL = async (req, res, next) => {
  var id = req.params.idtl;
  console.log(id);
  try {
    await myModel.theloaiModel.findByIdAndDelete(id);
    console.log("xoá thành công");
    return res.redirect("/loai");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteSp = async (req, res, next) => {
  var id = req.params.idsp;
  console.log(id);
  try {
    await myModel.spModel.findByIdAndDelete(id);
    console.log("xoá thành công");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
