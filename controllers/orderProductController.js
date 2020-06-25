const db = require("../models/index");
const handler = require("./handlerRequest");

const OrderProduct = db.orderProduct;
const Order = db.order;
const Product = db.product;

exports.getAllOrderProducts = handler.getAll(OrderProduct, [Order, Product]);
exports.getOrderProduct = handler.getOne(OrderProduct);
exports.createOrderProduct = handler.createOrder([Order, OrderProduct, Product]);
exports.updateOrderProduct = handler.updateOne(OrderProduct);
exports.deleteOrderProduct = handler.deleteOne(OrderProduct);
