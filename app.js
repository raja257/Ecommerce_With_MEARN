const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.use('/products' , productRoutes);
app.use('/orders' , orderRoutes);
app.use('/user' , userRoutes);
app.use('/uploads' , express.static('uploads'));
app.use('/profileUpload' , express.static('profileUpload'));
app.use((req , res , next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
               'Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type,Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods' , 'PUT,POST, PATCH,GET,DELETE');
        return res.status(200).json({});
    }
})

mongoose.connect(
    process.env.ECOMMERCE_URI,
    {
     useUnifiedTopology:true ,
     useNewUrlParser: true,
     useCreateIndex: true
    },
    (req,res) => {
        console.log("connected to the database ");
    })
mongoose.Promise = global.Promise;
//Routes which should handle the request
app.use((req , res , next) => {
    const error = new Error('not found');
    res.status(404);
    next(error)
});

app.use(( error,req , res , next) => {
    res.status(error.status || 500);
    res.json({ 
        message: error.message
    })
})

module.exports = app;