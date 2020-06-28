const express = require('express');
const productController = require('../controllers/productController');
const auth = require('../middlewares/authenticate');

const router = express.Router();

router
  .route('/')
  .get(auth.authenticate, productController.getAllProducts)
  .post(auth.authenticate, auth.accessOnlyAdmin, productController.createProduct);

router
  .route('/:id')
  .get( productController.getProduct)
  .patch(auth.authenticate, auth.accessOnlyAdmin, productController.updateProduct)
  .delete(auth.authenticate, auth.accessOnlyAdmin, productController.deleteProduct);

module.exports = router;