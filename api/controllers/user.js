const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.user_create_user = (req, res , next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1){
           return  res.status(409).json({message  : 'already a user'})
        } else {
            bcrypt.hash(req.body.password , 10 , (err, hash) =>  {
                if (err) {
                    return res.status(500).json({ error  : err})
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password:hash,
                        contact : req.body.contact,
                    });
                    user.save()
                    .then((result) => {
                        console.log(result);
                        res.status(201).json({
                            message : 'user created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error  : err});
                    })
                }
            });
        }
    })    
}

exports.user_login_user = (req, res , next) => {
    User.find({email : req.body.email})
    .then(user => {
        if(user.length < 1) {
            res.status(401).json({
                message : 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password , user[0].password , (err, result , next)  => {
            if(err) {
              return  res.status(401).json({
                  message : 'Auth failed'
              })
            }
            if (result) {
             const token =  jwt.sign({
                   email : user[0].email,
                   userId : user[0]._id
               }, process.env.JWT_KEY , {
                   expiresIn : '1h'
               })
               return res.status(200).json({
                   message : 'Auth successful',
                   token : token
               })
            }
            res.status(401).json({ 
                message : ' Auth failed'
            })
        })
    })

    .catch(err => { 
        res.status(500).json({ error  : err})   
    })
}


exports.user_delete_user = (req, res , next) => {
    User.remove({_id : req.params.userId})
    .exec()
    .then((result) => {
        res.status(200).json({
            message : 'User deleted'
        })
     })
    .catch(err => {
        res.status(500).json({ error  : err})
    })
}