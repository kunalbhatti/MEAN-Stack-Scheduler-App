const express = require('express');
const app = express();

const config = require('./../config');
const jwt = require('jsonwebtoken');

validateToken = app.use((req, res, next) => {
    const token = req.headers['x-access-token'];
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send('invalid token');
        }

        if (decoded) {
            req.uid = decoded.id;
            req.role = decoded.role;
            
            if ((decoded.recovery === true && req.url == '/reset-password') || !decoded.recovery){
                next();
            } else {
                return res.status(401).send('invalid token');
            }
        }

    });

});

module.exports = {
    validateToken
}