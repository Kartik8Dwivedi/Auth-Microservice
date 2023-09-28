const express = require('express');

const UserController = require('../../controllers/user-controller');
const { AuthValidator } = require('../../middlewares/index');

const router = express.Router();

router.post(
    '/signup',
    AuthValidator.validateAuth, 
    UserController.create
);
router.post(
    '/signin',
    AuthValidator.validateAuth ,
    UserController.signIn
);

module.exports = router;