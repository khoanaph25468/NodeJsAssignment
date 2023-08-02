var db = require("./db");
const spSchema = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    id_theloai: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "theloaiModel",
    },
  },
  {
    collection: "san_pham",
  }
);

const theloaiSchema = db.mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  { collection: "the_loai" }
);

let spModel = db.mongoose.model("spModel", spSchema);

let theloaiModel = db.mongoose.model("theloaiModel", theloaiSchema);
module.exports = {
  spModel,
  theloaiModel,
};
