'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Order_Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Orders',
          key: 'id',
        }
      },
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      amountProduct: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Order_Products');
  }
};