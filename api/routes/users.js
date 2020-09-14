const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')

router.post("/signup", UserController.user_create_user)

router.post('/login' , UserController.user_login_user)

router.delete('/:userId', UserController.user_delete_user)

module.exports = router