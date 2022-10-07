const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');
const nodemailer = require('nodemailer');

//Config
const Config = require("../configPrivatInfo")

//Set up the transporter for the e-mail
const transporter = nodemailer.createTransport({
    service: Config.provider,
    auth: {
        user: Config.email,
        pass: Config.pass
    }
});

const User = require('../models/user');

/*************************************************
 * GET LOGIN | SING UP
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
        title: 'HOME OFFICE POST | Login',
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
        title: 'HOME OFFICE POST | Sign Up',
        home: false,
        login: false,
        singUp: true,
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

/*************************************************
 * POST LOGIN | SING UP | LOG OUT
 * ***********************************************/
//This controller will handle the POST Sing UP Page
exports.postSignUp = (req, res, next) => {
    //User Information
    const email = req.body.email;
    const password = req.body.password;

    //Check for errors set in the router
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            title: 'HOME OFFICE POST | Sign Up',
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

    //Incrypt the password
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                preferedJobs: { jobs: [] }
            });
            //save in the database
            return user.save();
        })
        .then(result => {
            //Sign UP E-mail
            var mailOptions = {
                from: 'homeofficepost2020@gmail.com',
                to: email,
                subject: 'Home Office POST',
                html: '<div style="text-align: center; padding-top: 40px;"><div style="display:inline-block; width: 500px; text-align: left; background-color: #F6F6F8; padding: 1.5em; border-radius: 8px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"><h1>Thank You For Singing Up with Home Office POST!</h1><p>Good luck on your job search. Here are a few tips to succeed!</p><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque nihil illum fugiat maiores tenetur culpa dolor modi blanditiis doloribus? Excepturi perspiciatis dicta corporis, accusantium illo soluta eligendi possimus eos illum!</p><a href="https://safe-dawn-11858.herokuapp.com/"><p>Home Office Post</p></a></div></div>'
            }
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.redirect('/login');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
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
            title: 'HOME OFFICE POST | Login',
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
                    title: 'HOME OFFICE POST | Login',
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
                            res.redirect('/jobboard');
                        });
                    }
                    return res.status(422).render('auth/login', {
                        errorMessage: 'Invalid email or password.',
                        title: 'HOME OFFICE POST | Login',
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