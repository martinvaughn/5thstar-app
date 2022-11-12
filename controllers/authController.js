require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');
const { uuidV4 } = require('mongodb/lib/core/utils');
const nodemailer = require('nodemailer');
const uuidv4 = require('uuidv4');

//Config
// const Config = require("../configPrivatInfo")

//Set up the transporter for the e-mail
const transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com", // Ask mv if this breaks.
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
});

const User = require('../models/user');

/*************************************************
 * GET LOGIN | SIGN UP
 * ***********************************************/
//This controller will handle the GET Login Page
exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        title: '5thstar | Login',
        home: false,
        login: true,
        singUp: false,
        board: false,
        errorMessage: message,
        oldInput: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationErrors: []
    });
};

/*********************************************** */
//This controller will handle the GET Sing Up page
exports.getSignUp = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        title: '5thstar | Sign Up',
        home: false,
        login: false,
        singUp: true,
        board: false,
        password: 123,
        errorMessage: message,
        oldInput: {
            email: '',
            password: '',
            confirmPassword: ''

        },
        validationErrors: []
    });
};

/*************************************************
 * POST LOGIN | SIGN UP | LOG OUT
 * ***********************************************/
//This controller will handle the POST Sign Up Page
exports.postSignUp = (req, res, next) => {
    //User Information
    console.log("bananas!!!!")
    const email = req.body.email;
    const phone = req.body.phone;
    const businessName = req.body.businessName;
    const businessEmailName = req.body.businessEmailName;
    const reviewLink = req.body.reviewLink; 
    const websiteLink = req.body.websiteLink;
    const password = req.body.password;
    const businessId = uuidV4();
    
    
    //Check for errors set in the router
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        
        return res.status(422).render('auth/signup', {
            title: '5thstar | Sign Up',
            home: false,
            login: false,
            singUp: true,
            board: false,
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password,
                confirmPassword: req.body.confirmPassword
            },
            validationErrors: errors.array()
        });
    };

    //Encrypt the password
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                phone: phone,
                password: hashedPassword,
                businessName: businessName,
                businessEmailName: businessEmailName,
                reviewLink: reviewLink,
                websiteLink: websiteLink,
                businessId: businessId,
                emailQueue: [],
            });
            //save in the database
            return user.save();
        })
        .then(result => {
            console.log("sign up result..", result);
            //Sign UP E-mail
            var mailOptions = {
                from: '"Bloom MKTG" <contact@bloom-mktg.info>',
                to: email,
                subject: 'Welcome to 5star - a Bloom MKTG Product',
                message: 'Congrats on joining Thanks, the first email automation platform to bring better reviews to your business.'
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("Error Sending Emails: ", error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.redirect('/login');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            console.log("dook", error)
            return next(error);
        });
};

/********************************************** */
//This controller will handle the POST Login Page
exports.postLogin = (req, res, next) => {
    //User info
    const email = req.body.email;
    const password = req.body.password;

    //Check for error coming from the express-checker set in the router
    //If there is any it will handle the page back
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/login', {
            title: '5thstar | Login',
            home: false,
            login: true,
            singUp: false,
            board: false,
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        });
    }
    //Look for the user
    User.findOne({ email: email })
        .then(user => {
            //If user is not found handle page back with error messages
            if (!user) {
                return res.status(422).render('auth/login', {
                    title: '5thstar | Login',
                    home: false,
                    login: true,
                    singUp: false,
                    board: false,
                    errorMessage: 'Invalid email or password.',
                    oldInput: {
                        email: email,
                        password: password
                    },
                    validationErrors: []
                });
            }
            //Check the password
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/dashboard');
                        });
                    }
                    return res.status(422).render('auth/login', {
                        errorMessage: 'Invalid email or password.',
                        title: '5thstar | Login',
                        home: false,
                        login: true,
                        singUp: false,
                        board: false,
                        oldInput: {
                            email: email,
                            password: password
                        },
                        validationErrors: []
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

/********************************************
 * POST for LOG OUT
 */
exports.getLogOut = (req, res, next) => {
    //Detroy the Session
    req.session.destroy(err => {
        res.redirect('/');
    });
};