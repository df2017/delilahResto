const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

// router
//   .route('/:id')
//   .get(billingController.getBilling)
//   .patch(billingController.updateBilling)
//   .delete(billingController.deleteBilling);

module.exports = router;