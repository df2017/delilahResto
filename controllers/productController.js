const db = require('../models/index');
const handler = require('./handlerRequest');

const Product = db.product;

exports.getAllProducts = handler.getAll(Product);
exports.getProduct = handler.getOne(Product);
exports.createProduct = handler.createProduct(Product);
exports.updateProduct = handler.updateOne(Product);
exports.deleteProduct = handler.deleteOne(Product);
exports.uploadImage = handler.upload;