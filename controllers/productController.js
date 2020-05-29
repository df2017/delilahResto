const db = require('../models/index');
const handler = require('./handlerRequest');

const Product = db.product;

exports.getAllProducts = handler.getAll(Product);
//exports.getBilling = factory.getOne(Billing, Project);
exports.createProduct = handler.createOne(Product);
//exports.updateBilling = factory.updateOne(Billing);
//exports.deleteBilling = factory.deleteOne(Billing);