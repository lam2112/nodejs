const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    iduser: {type: String},
    nameuser: {type: String},
    iditem: {type: String},
    nameitem: {type: String},
    amount: {type: Number},
    cost: {type: Number},
    status: {type: Number},
    phoneNumber: {type: Number},
    address: {type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);