const express = require('express');
const orderStatusController = require('../controllers/orderStatusController');
const auth = require('../middlewares/authenticate');

const router = express.Router();

router
  .route('/')
  .get([auth.authenticate, auth.accessOnlyAdmin], orderStatusController.getAllOrderStatus)
  .post([auth.authenticate, auth.accessOnlyAdmin], orderStatusController.createOrderStatus);

router
  .route('/:id')
  .get([auth.authenticate, auth.accessOnlyAdmin], orderStatusController.getOrderStatus)
  .patch([auth.authenticate, auth.accessOnlyAdmin], orderStatusController.updateOrderStatus)
  .delete([auth.authenticate, auth.accessOnlyAdmin], orderStatusController.deleteOrderStatus);

module.exports = router;