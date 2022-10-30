//Export express
const express = require('express');

//Instantiate to use the functionalities
const router = express.Router();

//Get the controllers
const pageController = require("../controllers/appController");
const emailController = require("../controllers/emailController");
const customerController = require("../controllers/customerController");

//Require the Authentication Meddleware
const auth = require('../middleware/is-auth');

/***************************************
 * Common Routes for the Page
 ***************************************/
//Home Router
router.get('/', pageController.home);

// //Joab Board Router
// router.get('/jobboard', auth, pageController.jobBoard);

// //POST Joab Board Router save
// router.post('/saved', auth, pageController.postSaved)

// //GET the saved jobs
// router.get('/saved', auth, pageController.getSaved)

// //POST removeJob
// router.post('/removejob', auth, pageController.removeJobs)

// //GET updated the NavCount that counts job
// router.get('/updatedNavCount', auth, pageController.updatedNavCount)


// Main Pages

router.get('/dashboard', auth, pageController.getBusinessDashboard)

router.get('/settings', auth, pageController.getSettings)

// GET the metrics page.
router.get('/metrics', auth, pageController.getMetrics)


/***************************************
 * Email Routes
 ***************************************/

router.post('/dashboard', auth, emailController.sendEmailsToCustomers)

/***************************************
 * Customer Routes
 ***************************************/

// GET customer feedback
router.get('/feedback', auth, customerController.getCustomerFeedback)

// // GET the page for a customer to review a business.
router.get('/review', customerController.getReviewPage)

// // POST the request sent when a user sends feedback
router.post('/review', customerController.postReviewPage)

module.exports = router;