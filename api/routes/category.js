const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category')
const CheckAuth = require('../middleware/Auth-check');
const adminMiddleWare = require('../middleware/Auth-check')

router.post('/create',CheckAuth , adminMiddleWare ,CategoryController.create_category)
router.get('/' , CategoryController.get_categories)


module.exports = router