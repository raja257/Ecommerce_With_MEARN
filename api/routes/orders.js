const express = require('express');
const router = express.Router();
const CheckAuth = require('../middleware/Auth-check')
const OrdersController = require('../controllers/orders')


router.get('/' ,CheckAuth, OrdersController.orders_get_all ) 

router.post('/' ,CheckAuth , OrdersController.orders_post_order)

router.get('/:orderId',CheckAuth ,OrdersController.orders_get_single_order)

router.delete('/:orderId',CheckAuth , OrdersController.orders_delete_order)

module.exports = router