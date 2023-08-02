exports.yeu_cau_dang_nhap = (req, res, next) => {
  if (req.session.userLogin) {
    // có tồn tại thông tin user login : đã đăng nhập
    next();
  } else {
    return res.redirect("/user/login");
  }
};
exports.khong_yc_dang_nhap = (req, res, next) => {
  if (!req.session.userLogin) {
    next();
  } else {
    return res.redirect("/user");
  }
};
