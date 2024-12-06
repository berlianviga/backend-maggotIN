const express = require('express');
const UserController = require('../controller/userController');
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.post('/users/register', UserController.registerUser);

router.post('/users/login', UserController.loginUser);

router.get('/users', userAuth, UserController.getUser); 

router.get('/users/refresh-token', UserController.refreshAccessToken);

router.delete('/users/logout', UserController.logoutUser);

module.exports = router;
