const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config');
const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(transport({
    auth: {
        api_key: config.api_key
    }
}))

const User = require('./../models/user.model');
const ObjectId = require('mongodb').ObjectId;

const validateRegData = require('./../middlewares/validateRegData.middleware');
const validateToken = require('../middlewares/validateToken.middleare').validateToken;

router.post('/register', validateRegData, (req, res) => {
    User.findUser({
        email: req.body.email
    }).then(
        user => {

            if (user) {
                return res.send({
                    auth: false,
                    message: 'Account Already Exists'
                });
            }

            bcrypt.hash(req.body.password, 8, (err, hash) => {
                if (err) {
                    return res.status(500).send('Error on the server');
                }

                const user = new User(req.body.name, req.body.email, hash, 'user');

                user.register().then(
                    newUser => {
                        const token = jwt.sign({
                            id: newUser.insertedId,
                            role: 'user'
                        }, config.secret);
                        res.status(200).send({
                            auth: true,
                            token
                        });
                        transporter.sendMail({
                            to: req.body.email,
                            from: config.from,
                            subject: 'Welcome',
                            html: '<div>Welcome to the app</div>'
                        });
                    }
                ).catch(
                    err => {
                        res.status(500).send('Error on the server');
                    }
                );
            })
        }
    ).catch(err => {
        res.status(500).send('Error on the server');
    });
});

router.post('/login', (req, res) => {
    User.findUser({
        email: req.body.email
    }).then(
        user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, success) => {
                    if (err) {
                        res.status(500).send('Error on the server');
                    }
                    if (!success) {
                        res.status(401).send({
                            auth: false,
                            token: null
                        });
                    }
                    if (success) {
                        const token = jwt.sign({
                            id: user._id,
                            role: user.role
                        }, config.secret);

                        res.send({
                            auth: true,
                            token
                        });
                    }
                })
            } else {
                res.status(404).send('Invalid Username/Password')
            }
        }
    ).catch(
        err => {
            res.status(500).send('Error on the server')
        }
    )
});

router.put('/update', validateRegData, (req, res) => {
    User.findUser({
        email: req.body.email
    }).then(
        userData => {
            if (userData) {
                bcrypt.hash(req.body.password, 8, (err, hash) => {
                    if (err) {
                        return res.status(500).send('Error on the server');
                    }

                    User.update({
                        email: req.body.email
                    }, {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        role: userData.role
                    }).then(
                        updatedUser => {
                            var token = jwt.sign({
                                id: userData._id,
                                role: updatedUser.role
                            }, config.secret, {
                                expiresIn: 86400
                            });

                            res.status(200).send({
                                auth: true,
                                token
                            });
                        }
                    ).catch(
                        err => {
                            res.status(500).send('Error on the server');
                        }
                    );

                });
            } else {
                res.status(404).send('user not found');
            }
        }
    ).catch(
        err => {
            res.status(500).send('Error on the server');
        }
    );
})


router.get('/logout', (req, res) => {
    res.status(200).send({
        auth: false,
        token: null
    });
})

router.post('/recovery-link', (req, res) => {

    User.findUser({
        email: req.body.email
    }).then(
        user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found'
                });
            } else {
                const token = jwt.sign({
                    id: user._id,
                    recovery: true
                }, config.secret, {
                    expiresIn: 3600
                });
                res.status(200).send({
                    message: 'Password recovery link sent to your email.',
                    token
                });

                const uri = 'http:localhost:4200/auth/password-reset/' + token;

                transporter.sendMail({
                    to: req.body.email,
                    from: config.from,
                    subject: 'Password Recovery',
                    html: `<div>${uri}</div>`
                });
            }
        }
    )
});

router.put('/reset-password', validateToken, (req, res) => {
    User.findUser({
        _id: new ObjectId(req.id)
    }).then(
        user => {
            if (user) {
                
                User.update({_id: new ObjectId(req.id)}, {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: user.role
                }).then(
                    result => {
                        res.send({
                            valid: true,
                            message: 'password has been reset'
                        });
                    }
                ).catch(
                    err => {
                        console.log(err)
                        res.status(500).send('Error on the server');
                    }
                );
            }
        }
    ).catch(err => {
        console.log(err)
        res.status(500).send('Error on the server');
    });
})

router.post('/validate-login', (req, res) => {
    let token = '';

    token = req.headers['x-access-token'];

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(200).send({auth: false});
        }

        User.findUser({_id: new ObjectId(decoded.id)}).then(
            result => {
                res.send({auth: true, name: result.name});
            }
        );  
    });
})

module.exports = router