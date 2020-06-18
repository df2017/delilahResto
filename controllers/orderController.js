const db = require('../models/index');
const handler = require('./handlerRequest');

const Order = db.order;

exports.getAllOrders = handler.getAll(Order);
exports.getOrder = handler.getOne(Order);
exports.createOrder = handler.createOne(Order);
exports.updateOrder = handler.updateOne(Order);
exports.deleteOrder = handler.deleteOne(Order);