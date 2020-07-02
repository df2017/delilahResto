const express = require('express');
const payTypeController = require('../controllers/payTypeController');
const auth = require('../middlewares/authenticate');

const router = express.Router();

router
  .route('/')
  .get([auth.authenticate, auth.accessOnlyAdmin], payTypeController.getAllPayType)
  .post([auth.authenticate, auth.accessOnlyAdmin], payTypeController.createPayType);

router
  .route('/:id')
  .get([auth.authenticate, auth.accessOnlyAdmin], payTypeController.getPayType)
  .patch([auth.authenticate, auth.accessOnlyAdmin], payTypeController.updatePayType)
  .delete([auth.authenticate, auth.accessOnlyAdmin], payTypeController.deletePayType);

module.exports = router;