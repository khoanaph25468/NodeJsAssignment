// var fs = require("fs");
// exports.index = (req, res, next) => {
//   if (req.method == "POST") {
//     //di chuyển file từ thư mục tmp sang public/upload
//     //fs.rename(đường dẫn gốc, đường dẫn mới, callback)
//     fs.rename(
//       req.file.path,
//       "./public/uploads/" + req.file.originalname,
//       (err) => {
//         if (err) console.log(err);
//         console.log(
//           "URL: htpp://localhost:3000/uploads/" + req.file.originalname
//         );
//       }
//     );
//   }
//   res.render("home/index");
// };
exports.index = (req, res, next) => {
  // hien thi noi dung
  res.render("home/index");
};
