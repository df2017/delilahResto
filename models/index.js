'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.product = require('./product')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);
db.orderStatus = require('./order_status')(sequelize, Sequelize);
db.order = require('./order')(sequelize, Sequelize);
db.orderProduct = require('./order_product')(sequelize, Sequelize);


db.order.belongsTo(db.user, {
  sourceKey: 'id',
  foreignKey: 'id_user',
});

db.order.belongsTo(db.orderStatus, {
  sourceKey: 'id',
  foreignKey: 'id_status',
});

db.orderProduct.belongsTo(db.order, {
  sourceKey: 'id',
  foreignKey: 'id_order',
});
db.orderProduct.belongsTo(db.product, {
  sourceKey: 'id',
  foreignKey: 'id_product',
});

module.exports = db;

