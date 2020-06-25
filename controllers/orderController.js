const db = require('../models/index');
const handler = require('./handlerRequest');

const Order = db.order;
const Order_Status = db.orderStatus;
const User = db.user;

exports.getAllOrders = handler.getAll(Order, [Order_Status, User]);
exports.getOrder = handler.getOne(Order);
exports.createOrder = handler.createOne(Order);
exports.updateOrder = handler.updateOne(Order);
exports.deleteOrder = handler.deleteOne(Order);