const mongoose = require('mongoose');

const priductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {
        type: String ,
        require : true,
        trim: true
    }, 
    price : {
        type : 
        Number,
        require : true
    },
    description : { 
        type: String ,
        require : true,
        trim : true
    },
    productImage : { 
        type: String ,
        require : true
    },
    slug : {
        type: String,
        required: true,
        unique: true
    },
    offers : {
        type: Number
    },
    reviews : [
        {
            userId :{type :  mongoose.Schema.Types.ObjectId, ref : 'User',}, 
            review : String
        }
    ],
    category : {type : mongoose.Schema.Types.ObjectId, ref : 'Category' , required: true},
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref : 'User', },
    updatedat : Date
});
const Product = mongoose.model('Product',priductSchema);

module.exports = Product;
