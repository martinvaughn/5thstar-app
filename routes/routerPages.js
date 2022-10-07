//Export express
const express = require('express');

//Instantiate to use the functionalities
const router = express.Router();

//Get the controllers
const pageController = require("../controllers/appController");

//Require the Authentication Meddleware
const auth = require('../middleware/is-auth');

/***************************************
 * Commum Roters for the Page
 ***************************************/
//Home Router
router.get('/', pageController.home);

//Joab Board Router
router.get('/jobboard', auth, pageController.jobBoard);

//POST Joab Board Router save
router.post('/saved', auth, pageController.postSaved)

//GET the saved jobs
router.get('/saved', auth, pageController.getSaved)

//POST removeJob
router.post('/removejob', auth, pageController.removeJobs)

//GET updated the NavCount that counts job
router.get('/updatedNavCount', auth, pageController.updatedNavCount)



module.exports = router;