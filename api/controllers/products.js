const Product = require('../models/product');
const mongoose = require('mongoose');

exports.product_get_all_products = (req , res , next) => {
    Product.find()
     .select("name price _id description productImage")
    .then((product) =>{
         const response = {
             count : product.length,
             product : product.map(product => {
                 return {
                     name : product.name,
                     price : product.price,
                     description : product.description,
                     productImage:product.productImage,
                     _id : product._id,
                     request : {
                         type : 'GET',
                         url : 'http://localhost:2020/products/' + product._id
                     }
                 }})}  
          res.status(200).json(response)
    })
    .catch((error) =>{
        console.log(error);
        res.status(500).json({error : error})
    })
 }

exports.product_post_product = (req , res , next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        productImage : req.file.path
    })    

    product.save()
    .then((product) => {
        console.log(product);
        res.status(200).json({
            message: 'handling post request to products',
            Createdproduct: {
                name : product.name,
                price : product.price,
                description : product.description,
                productImage: product.productImage,
                request : {
                    type : 'GET',
                    url : 'http://localhost:2020/products/' + product._id
                }
            }
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error : err})
    })    
}


exports.product_get_single_product = (req , res , next) => {
    const id =  req.params.productId;
    Product.findById(id)
        .select("name  price description _id")
        .then(product => {
        console.log(product);
        if (product) {
            res.status(200).json({
                product : product,
                request:{
                    type : 'GET',
                    url : 'http://localhost:2020/products/' + id
                }
            })
        } else {
            res.status(404).json({message : 'Product id not found'})
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error:err})
       });
}


exports.product_update_product = (req , res , next) => {
    const id =  req.params.productId;
    const updateOps = {};
     for (const ops of req.body ) {
         updateOps[ops.propName] = ops.value;
     }
    Product.update({_id : id} , {$set : updateOps})
    .then((product) => {
        console.log(product);
        res.status(200).json({ 
            message : "product updated successfully",
            request : {
                type : 'GET',
                url : 'http://localhost:2020/products/' + id
            }
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({error : error})
    })
}


exports.product_delete_product = (req , res , next) =>{
    const id = req.params.productId
    Product.remove({_id : id})
    .then((product) => {
        res.status(200).json({
            message : 'Product removed successfully',
            request : {
                type : 'POST',
                url : 'http://localhost:2020/products/',
                body : {name : "String" , price : "Number"}
            }
        })
    })
    .catch((error) =>{
        res.status(404).json({ error : error})
    })
}