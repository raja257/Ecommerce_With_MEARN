const express = require('express');
const router = express.Router();
const CheckAuth = require('../middleware/Auth-check')
const AdminController = require('../controllers/admin')
const adminMiddleWare = require('../middleware/Auth-check')

router.get('/', CheckAuth , adminMiddleWare,AdminController.admin_get_admin)

router.post('/signup' , AdminController.admin_create_admin)

router.post('/login' ,AdminController.admin_login_admin)

module.exports = router