const db = require('../models/index');
const handler = require('./handlerRequest');

const User_Role = db.userRole;

exports.getAllUserRoles = handler.getAll(User_Role);
exports.getUserRole = handler.getOne(User_Role);
exports.createUserRole = handler.createOne(User_Role);
exports.updateUserRole = handler.updateOne(User_Role);
exports.deleteUserRole = handler.deleteOne(User_Role);