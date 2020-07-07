const express = require('express');
const orderProductController = require('../controllers/orderProductController');
const auth = require('../middlewares/authenticate');

const router = express.Router();

router
  .route('/')
  .get([auth.authenticate, auth.accessOnlyAdmin], orderProductController.getAllOrderProducts)
  .post([auth.authenticate],orderProductController.createOrderProduct);

router
  .route('/:id')
  .get([auth.authenticate, auth.accessOnlyAdmin], orderProductController.getOrderProduct)

module.exports = router;