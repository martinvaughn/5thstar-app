//Export express
const express = require('express');
const { check, body } = require('express-validator/check');

//Instantiate to use the functionalities
const router = express.Router();

//Get the controllers
const authController = require("../controllers/authController");

const User = require('../models/user');

/***************************************
 * Routers for the Authentication
 ***************************************/
//Main Get Routes for Login | SignUp
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignUp);

//POST Routes for SignUp
router.post('/signup', [
        //Input Validation using the express-validator package
        check('email')
        .isEmail()
        .withMessage('Invalid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject(
                        'Email already registred. Please try a different one!'
                    );
                }
            });
        })
        .normalizeEmail(),
        body(
            'password',
            'Please enter at least 6 characters password containing only letters and numbers.'
        )
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim(),
        body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords doesn't match!");
            }
            return true;
        })
    ],
    //make to the controler with the proper error messages or clean
    authController.postSignUp);

//POST Routes for Login 
router.post('/login', [
        //Input Validation using the express-validator package
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),
        body('password', 'Invalid Password.')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
    ],
    //make to the controler with the proper error messages or clean
    authController.postLogin);

//GET for LogOut
router.get('/logout', authController.getLogOut);

module.exports = router;