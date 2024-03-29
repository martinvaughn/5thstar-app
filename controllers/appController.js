const https = require('https');
const { render } = require('ejs');
const fetch = require("node-fetch");
const emailController = require("./emailController");

/*************************************************
 * THE IP IS LOADED HERE FOR BETTER PEFORMANCE WHEN
 * LOADING THE PAGE SO IT IS READY TO SEND
 * ***********************************************/
//to hold the objects
var parsedData;
var parsedSmtpData;


//Connnect to the API
// https.get("https://remotive.io/api/remote-jobs", (ress) => {

//     //variable to store hte chunk data
//     data = [];

//     ress.on("data", (chunk) => {
//         data.push(chunk);
//     });

//     ress.on("end", () => {
//         parsedData = JSON.parse(Buffer.concat(data).toString());
//     });
// });

//Keep track of the number of jobs saved to display on the nav when the AJAX request
// var countingJobsTop = 0;

/*************************************************
 * GET CONTROLER FOR HOME 
 * ***********************************************/
//This controller will handle the home page
exports.home = (req, res, next) => {
    res.render('pages/home', {
        title: '5thstar | Home',
        home: true,
        login: false,
        singUp: false,
        board: false,
    });
};

/*************************************************
 * GET JOB BOARD CONTROLLER
 * ***********************************************/
// exports.jobBoard = async (req, res, next) => {
//     const customers = [
//         { name: "Cole MartinDale", email: "martinvaughn16@gmail.com", datePurchased: "10/20/2022" },
//         { name: "MarvIn Lawn", email: "martinvaughn.io@gmail.com", datePurchased: "10/20/2022" },
//         { name: "Johnny Goodseed", email: "contact@thanks.rip", datePurchased: "10/20/2022" },
//     ]

//     req.user.uploads.push({ purchases: customers.length, fileName: "fileName", status: "Delivered" })
//     req.user.save();
//     // await emailController.sendEmailsToCustomersAsync(customers, "Thanks for connecting with Bloom", "Let us know how we can help");

//     res.render('pages/jobboard', {
//         title: '5thstar | Job Board',
//         home: false,
//         login: false,
//         singUp: false,
//         board: true,
//         data: parsedData,
//         jobSavedNumber: ((req.user.Savedjobs.length).toString()),
//         savedJobsID: req.user.Savedjobs
//     });

// };

// /*************************************************
//  * POST SAVED JOB
//  * ***********************************************/
// exports.postSaved = (req, res, next) => {
//     //Receive the JOB ID
//     const jobID = req.body.job_id.trim();

//     //Check if item is not in the jobs so it only add if it is not
//     if (!req.user.Savedjobs.includes(jobID)) {
//         req.user.Savedjobs.push(jobID);
//         req.user.save();
//     }

//     //Update the counting jobs
//     countingJobsTop = req.user.Savedjobs.length;

//     res.redirect('/jobboard')
// };

// /*************************************************
//  * GET SAVED JOB
//  * ***********************************************/
// exports.getSaved = (req, res, next) => {
//     //get the object of jobs.jobs[index].id
//     const jobs = parsedData;

//     //get the user saved jobs savedJobID[ids]
//     const savedJobID = req.user.Savedjobs;

//     //Saved Jobs object
//     var savedJobs = [];

//     //Store the the saved jobs that will be hadled
//     jobs.jobs.forEach(job => {
//         savedJobID.forEach(savedID => {
//             if (job.id == savedID) {
//                 savedJobs.push(job);
//             }
//         });
//     });

//     //send them to the page
//     res.render('pages/savedJobs', {
//         title: '5thstar | Saved Jobs',
//         home: false,
//         login: false,
//         singUp: false,
//         board: false,
//         data: savedJobs,
//         jobSavedNumber: ((req.user.Savedjobs.length).toString())
//     });
// };

// /*************************************************
//  * POST REMOVE JOB
//  * ***********************************************/
// exports.removeJobs = (req, res, next) => {
//     //get the job id
//     const jobId = req.body.removeJobID.trim();

//     //Store the updated array of saved jobs
//     var updatedJobsSaved = [];

//     //remove item
//     req.user.Savedjobs.forEach(element => {
//         if (element != jobId) {
//             updatedJobsSaved.push(element);
//         }
//     });

//     //Update Couting Jobs
//     countingJobsTop = req.user.Savedjobs.length;

//     //update the database
//     req.user.Savedjobs = updatedJobsSaved;
//     req.user.save();


//     res.redirect('/saved');
// }

/*************************************************
 * GET JOB COUNT FOR NAV BAR
 * ***********************************************/
// exports.updatedNavCount = (req, res, next) => {

//     //TOP NAV UPDATE
//     res.render('pages/updatedNavCount', {
//         board: true,
//         jobSavedNumber: ((countingJobsTop))
//     })
// }


/*************************************************
 * New from us
 * ***********************************************/
const getData = async (req) => {
    const senderAlias = req.user.businessEmailName || "noreply";
    const requestBody =
    {
        "api_key": process.env.SMTP2GO_API_KEY,
        "start_date": "2020-01-01",
        "end_date": "2022-10-29",
        "limit": 5000,
        "username": "bloom-mktg.com",
        "filter_query": `sender:${senderAlias}@bloom-mktg.info`
    };

    const data = await fetch("https://api.smtp2go.com/v3/email/search", {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => response.json())
        .then((data) => { return data });;
    return data.data;
}

const getMetrics = (emails) => {
    const sent = emails.length;
    let opens = 0;
    let clicks = 0;
    let positive = 0;
    let neutral = 0;
    let negative = 0;

    emails.forEach(email => {
        opens += email.total_opens > 0 ? 1 : 0;
        clicks += email.total_clicks > 0 ? 1 : 0;
        if (email.clicks.length > 0) {
            if (email.clicks[0].url.includes("wonderful")) {
                positive += 1;
            }
            if (email.clicks[0].url.includes("decent")) {
                neutral += 1;
            }
            if (email.clicks[0].url.includes("poor")) {
                negative += 1;
            }
        }

    });

    return {
        sent: sent,
        opens: opens,
        clicks: clicks,
        positive: positive,
        neutral: neutral,
        negative: negative,
        totalRatings: positive + neutral + negative
    }
}


exports.getBusinessDashboard = async (req, res, next) => {
    // TODO c: remove data and metrics variables once they're no longer need on front end.

    //TOP NAV UPDATE
    res.render('pages/dashboard', {
        board: true,
        title: 'Dashboard | 5thstar',
        home: false,
        login: false,
        singUp: false,
        businessName: req.user.businessName,
        uploads: req.user.uploads || [],
        jobSavedNumber: 1
    })
}

exports.getMetrics = async (req, res, next) => {
    // TODO m: change this to be non-blocking
    const data = await getData(req);
    const metrics = getMetrics(data.emails)

    //TOP NAV UPDATE
    res.render('pages/metrics', {
        board: true,
        title: 'Metrics | 5thstar',
        home: false,
        login: false,
        singUp: false,
        businessName: req.user.businessName,
        scores: {
            negative: metrics.negative,
            neutral: metrics.neutral,
            positive: metrics.positive,
            totalRatings: metrics.totalRatings
        },
        analytics: {
            sent: metrics.sent,
            opened: metrics.opens,
            clicked: metrics.clicks,
        },
    })
}

exports.getSettings = async (req, res, next) => {

    res.render('pages/settings', {
        title: 'Settings | 5thstar',
        home: false,
        login: false,
        singUp: false,
        email: req.user.email,
        phone: req.user.phone || '4808255300', // TODO: remove the OR clauses
        businessName: req.user.businessName || "Cole",
        businessEmailName: req.user.businessEmailName,
        reviewLink: req.user.reviewLink,
        websiteLink: req.user.websiteLink,
    });
};
