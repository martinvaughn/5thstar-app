const https = require('https');
const { render } = require('ejs');

/*************************************************
 * THE IP IS LOADED HERE FOR BETTER PEFORMANCE WHEN
 * LOADING THE PAGE SO IT IS READY TO SEND
 * ***********************************************/
//to hold the objects
var parsedData;

//Connnect to the API
https.get("https://remotive.io/api/remote-jobs", (ress) => {

    //variable to store hte chunk data
    data = [];

    ress.on("data", (chunk) => {
        data.push(chunk);
    });

    ress.on("end", () => {
        parsedData = JSON.parse(Buffer.concat(data).toString());
    });
});

//Keep track of the number of jobs saved to display on the nav when the AJAX request
var countingJobsTop = 0;

/*************************************************
 * GET CONTROLER FOR HOME 
 * ***********************************************/
//This controller will handle the home page
exports.home = (req, res, next) => {
    res.render('pages/home', {
        title: 'HOME OFFICE POST | Home',
        home: true,
        login: false,
        singUp: false,
        board: false,
    });
};

/*************************************************
 * GET JOB BOARD CONTROLLER
 * ***********************************************/
exports.jobBoard = (req, res, next) => {

    res.render('pages/jobboard', {
        title: 'HOME OFFICE POST | Job Board',
        home: false,
        login: false,
        singUp: false,
        board: true,
        data: parsedData,
        jobSavedNumber: ((req.user.Savedjobs.length).toString()),
        savedJobsID: req.user.Savedjobs
    });

};

/*************************************************
 * POST SAVED JOB
 * ***********************************************/
exports.postSaved = (req, res, next) => {
    //Receive the JOB ID
    const jobID = req.body.job_id.trim();

    //Check if item is not in the jobs so it only add if it is not
    if (!req.user.Savedjobs.includes(jobID)) {
        req.user.Savedjobs.push(jobID);
        req.user.save();
    }

    //Update the counting jobs
    countingJobsTop = req.user.Savedjobs.length;

    res.redirect('/jobboard')
};

/*************************************************
 * GET SAVED JOB
 * ***********************************************/
exports.getSaved = (req, res, next) => {
    //get the object of jobs.jobs[index].id
    const jobs = parsedData;

    //get the user saved jobs savedJobID[ids]
    const savedJobID = req.user.Savedjobs;

    //Saved Jobs object
    var savedJobs = [];

    //Store the the saved jobs that will be hadled
    jobs.jobs.forEach(job => {
        savedJobID.forEach(savedID => {
            if (job.id == savedID) {
                savedJobs.push(job);
            }
        });
    });

    //send them to the page
    res.render('pages/savedJobs', {
        title: 'HOME OFFICE POST | Saved Jobs',
        home: false,
        login: false,
        singUp: false,
        board: false,
        data: savedJobs,
        jobSavedNumber: ((req.user.Savedjobs.length).toString())
    });
};

/*************************************************
 * POST REMOVE JOB
 * ***********************************************/
exports.removeJobs = (req, res, next) => {
    //get the job id
    const jobId = req.body.removeJobID.trim();

    //Store the updated array of saved jobs
    var updatedJobsSaved = [];

    //remove item
    req.user.Savedjobs.forEach(element => {
        if (element != jobId) {
            updatedJobsSaved.push(element);
        }
    });

    //Update Couting Jobs
    countingJobsTop = req.user.Savedjobs.length;

    //update the database
    req.user.Savedjobs = updatedJobsSaved;
    req.user.save();


    res.redirect('/saved');
}

/*************************************************
 * GET JOB COUNT FOR NAV BAR
 * ***********************************************/
exports.updatedNavCount = (req, res, next) => {

    //TOP NAV UPDATE
    res.render('pages/updatedNavCount', {
        board: true,
        jobSavedNumber: ((countingJobsTop))
    })
}