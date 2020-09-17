const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.admin_get_admin =  (req, res, next) => {
    Admin.find()
    .exec()
    .then(admin => {
        res.status(200).json({ 
            message: admin
        })
    })
    .catch(err => {
        res.status(500).json({ error  : err})
    })
}

exports.admin_create_admin = (req, res , next) => {
    Admin.find({email : req.body.email})
    .then((users) => {
        if(users.length > 0) {
            return res.status(500).json({
                message : "Already registered, try another email address"
            })
        } else {
            bcrypt.hash(req.body.password , 10 , (err, hash) => {
                //store hash in your password DB
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        role: 'admin',
                        password: hash,
                        createdAt: new Date().toISOString()
                    });
                    admin.save()
                    .then((admin) => {
                        console.log(admin);
                        res.status(200).json({
                            message : 'Admin registered successfully'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error : err})
                    })
                }
            })
        }
    })
}

exports.admin_login_admin =  (req, res , next) => {
    Admin.find({email : req.body.email})
    .exec()
    .then((user) => {
        if (user.length <= 0) {
            return res.status(500).json({
                message : 'something went wrong'
            });
        } else {
            // Load hash from your password DB.
            //const user = user[0];
            bcrypt.compare(req.body.password , user[0].password , (err , result ) => {
                console.log(`err ${err}`);
                console.log(`result ${result}`);

                if(err) {
                    return res.status(500).json({
                        message : "login failed"
                    })
                } else {

                    if(result){
                        const token =  jwt.sign({
                            email : user[0].email,
                            userId : user[0]._id,
                            role : user[0].role,
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
                }
            })
        }
    })
    .catch(err => { 
        res.status(500).json({ error  : err})   
    })
}