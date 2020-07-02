const db = require('../models/index');
const handler = require('./handlerRequest');

const Order_Status = db.orderStatus;

exports.getAllOrderStatus = handler.getAll(Order_Status);
exports.getOrderStatus = handler.getOne(Order_Status);
exports.createOrderStatus = handler.createOne(Order_Status);
exports.updateOrderStatus = handler.updateOne(Order_Status);
exports.deleteOrderStatus = handler.deleteOne(Order_Status);