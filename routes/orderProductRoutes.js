const express = require('express');
const orderProductController = require('../controllers/orderProductController');

const router = express.Router();

router
  .route('/')
  .get(orderProductController.getAllOrderProducts)
  .post(orderProductController.createOrderProduct);

router
  .route('/:id')
  .get(orderProductController.getOrderProduct)
  .patch(orderProductController.updateOrderProduct)
  .delete(orderProductController.deleteOrderProduct);

module.exports = router;