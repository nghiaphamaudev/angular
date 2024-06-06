const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/checkLogged', authController.checkLoggedIn);

router.route('/').get(userController.getAllUser);
router.route('/:id').delete(userController.deleteUser);

module.exports = router;
