const e = require('express');
const jwt = require('jsonwebtoken');

const CheckAuth = (req, res, next) => {
try { 

    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
    }
    else {
        return res.status(401).json({message  : 'Auth failed'});
    }
   
    next();
}
catch (err) {
    return res.status(401).json({message  : 'Auth failed'});
}}

module.exports = CheckAuth

exports.adminMiddleWare = (req, res, next) => {
if(req.user.role !== 'admin'){
    return res.status(401).json({message  : 'Auth failed'});
}
next()
}