const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product : {type : mongoose.Schema.Types.ObjectId ,ref: 'Product' , required : true},
    quantity : {type : Number , default : 1}
});

const Order = mongoose.model('Order',ordersSchema);
module.exports = Order;