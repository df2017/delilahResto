const db = require("../models/index");
const handler = require("./handlerRequest");
const { sequelize } = require("../models/index");

const Order = db.order;
const Order_Status = db.orderStatus;
const User = db.user;

// let hour = data[0].createdAt;
// let dateTimeFormat = new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit' }).format(hour) 
// console.log(dateTimeFormat)
// data[0].createdAt = dateTimeFormat


let orderFilter = {
  model: Order,
  attributes: ["id","details","totalAmount","pay"],
};

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
  attributes: [[fullName, "user"], "address"],
};

exports.getAllOrders = handler.getAll(Order, [orderStatusFilter, userFilter]);
exports.getOrder = handler.getOne(Order);
exports.createOrder = handler.createOne(Order);
exports.updateOrder = handler.updateOne(Order);
exports.deleteOrder = handler.deleteOne(Order);
