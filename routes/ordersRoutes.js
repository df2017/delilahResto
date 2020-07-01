const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/authenticate');

const router = express.Router();

router
  .route('/')
  .get([auth.authenticate, auth.accessOnlyAdmin],orderController.getAllOrders)

router
  .route('/:id')
  .get([auth.authenticate, auth.onlyOwner],orderController.getOrder)
  .patch([auth.authenticate, auth.accessOnlyAdmin],orderController.updateOrder)
  .delete([auth.authenticate, auth.accessOnlyAdmin],orderController.deleteOrder);

module.exports = router;