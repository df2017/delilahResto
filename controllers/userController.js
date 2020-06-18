const db = require('../models/index');
const handler = require('./handlerRequest');

const User = db.user;

exports.getAllUsers = handler.getAll(User);
exports.getUser = handler.getOne(User);
exports.createUser = handler.createOne(User);
exports.updateUser = handler.updateOne(User);
exports.deleteUser = handler.deleteOne(User);