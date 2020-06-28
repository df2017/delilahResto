const db = require("../models/index");
const handler = require("./handlerRequest");
const { sequelize } = require("../models/index");

const Order = db.order;
const Order_Status = db.orderStatus;
const User = db.user;
const Order_Product = db.orderProduct;

let orderStatusFilter = {
  model: Order_Status,
  attributes: ["status"],
};

let fullName = User.sequelize.fn(
  "concat",
  sequelize.col("name"),
  " ",
  sequelize.col("surname")
);
let userFilter = {
  model: User,
  attributes: [[fullName, "full_name"], "address"],
};

exports.getAllOrders = handler.getAll(Order, [orderStatusFilter, userFilter]);
exports.getOrder = handler.getOne(Order);
exports.createOrder = handler.createOne(Order);
exports.updateOrder = handler.updateOne(Order);
exports.deleteOrder = handler.deleteOne(Order);
