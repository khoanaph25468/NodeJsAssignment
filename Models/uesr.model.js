var db = require("./db");
const userSchema = db.mongoose.Schema(
  {
    username: { type: String, require: true },
    passwd: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    collection: "tb_user",
  }
);
let UserModel = db.mongoose.model("UserModel", userSchema);

module.exports = {
  UserModel,
};
