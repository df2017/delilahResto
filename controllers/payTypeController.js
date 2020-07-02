const db = require('../models/index');
const handler = require('./handlerRequest');

const Pay_Type = db.payType;

exports.getAllPayType = handler.getAll(Pay_Type);
exports.getPayType = handler.getOne(Pay_Type);
exports.createPayType = handler.createOne(Pay_Type);
exports.updatePayType = handler.updateOne(Pay_Type);
exports.deletePayType = handler.deleteOne(Pay_Type);