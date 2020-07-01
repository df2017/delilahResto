const express = require("express");
const userController = require("../controllers/userController");
const auth = require('../middlewares/authenticate');

const router = express.Router();

router
  .route("/")
  .get([auth.authenticate, auth.accessOnlyAdmin], userController.getAllUsers)

router
  .route("/:id")
  .get([auth.authenticate, auth.onlyOwner], userController.getUser)
  .patch([auth.authenticate, auth.onlyOwner], userController.updateUser)
  .delete([auth.authenticate, auth.accessOnlyAdmin], userController.deleteUser);

router
  .route("/register")
  .post(userController.createUser);

router
  .route("/login")  
  .post(userController.loginUser);

module.exports = router;
