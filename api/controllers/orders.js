const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req , res , next) => {
    Order.find()
    .select("product quantity _id")
    .populate('product')
    .then((order) => {
        res.status(200).json({
            count : order.length,
            order : order.map(orders => {
                return {
                    _id : orders._id,
                    product: orders.product,
                    quantity : orders.quantity,
                    request : {
                        type : 'GET',
                        url : "http://localhost:2020/orders/" + orders._id
                    }
                 }
             })
        })
    })
 }


exports.orders_post_order =  (req , res , next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if(!product) {
            res.status(404).json({
                message:'product not found'
            })
        }
        const order = new  Order({
            _id : new mongoose.Types.ObjectId(),
            quantity :req.body.quantity,
            product : req.body.productId
       });
     return order.save()
    })
    .then((order) =>{
        console.log(order);
        res.status(200).json({
            message : 'Order created',
            createdOrder : {
                _id : order._id,
                product : order.product,
                quantity : order.quantity
            },
            request : {
                type : 'GET',
                url : 'http://localhost:2020/orders/' + order._id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            message : 'Product not found',
            error : err
        })
    })   
}


exports.orders_get_single_order =  (req , res , next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .then(order => {
        if(!order){
            res.status(404).json({
                message: 'Order not found'
            })
        }
     res.status(200).json({
         order: order,
         request : {
             type : 'GET',
             url : 'http://localhost:2020/orders/'
         }
     })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
 }


exports.orders_delete_order = (req , res , next) => {
    Order.remove({_id : req.params.orderId})
    .then((order) => {
        res.status(200).json({
            message : 'Order deleted',
            request : {
                type : 'GET',
                url : 'http://localhost:2020/orders/',
                body : {productId : 'ID' , quantity : 'Number'}
            },

        })
    })
}