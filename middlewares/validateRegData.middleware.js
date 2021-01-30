const {
    EDESTADDRREQ
} = require('constants');
const express = require('express');
const app = express();

module.exports = app.use((req, res, next) => {
    const email = req.body.email.toLowerCase();
    let password = req.body.password.trim();

    if (password.length >= 6 && password.length <= 20) {
        if (validateEmail(email)) {
            req.body.email = email;
            req.body.password = password;
            
            next();
        }
    } else {
        return res.status(422).send({
            auth: false,
            message: 'Invalid Email/Password'
        });
    }
});

function validateEmail(email) {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
     
    if (email.match(mailformat))
        return (true)

    return (false)
}
