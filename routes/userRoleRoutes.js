const express = require('express');
const userRoleController = require('../controllers/userRoleController');
const auth = require('../middlewares/authenticate');

const router = express.Router();

router
  .route('/')
  .get([auth.authenticate, auth.accessOnlyAdmin], userRoleController.getAllUserRoles)
  .post([auth.authenticate, auth.accessOnlyAdmin], userRoleController.createUserRole);

router
  .route('/:id')
  .get([auth.authenticate, auth.accessOnlyAdmin], userRoleController.getUserRole)
  .patch([auth.authenticate, auth.accessOnlyAdmin], userRoleController.updateUserRole)
  .delete([auth.authenticate, auth.accessOnlyAdmin], userRoleController.deleteUserRole);

module.exports = router;