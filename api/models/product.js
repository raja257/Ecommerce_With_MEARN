const mongoose = require('mongoose');

const priductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {type: String , require : true}, 
    price : {type : Number, require : true},
    description : {type: String , require : true},
    productImage : {type: String , require : true}
});
const Product = mongoose.model('Product',priductSchema);

module.exports = Product;
