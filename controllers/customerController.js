const User = require('../models/user');

/*************************************************
 * GET A LIST OF USER CUSTOMER FEEDBACK
 * ***********************************************/
exports.getCustomerFeedback = async (req, res, next) => {
    res.render('pages/feedback', {
        title: '5thstar | Customer Feedback',
        home: false,
        login: false,
        singUp: false,
        board: false,
        businessName: req.user.businessName,
        customerFeedbackRows: req.user.customerFeedback,
    });
};

/*************************************************
 * GET A PAGE FOR A CUSTOMER TO LEAVE FEEDBACK.
 * ***********************************************/
exports.getReviewPage = async (req, res, next) => {
    const businessId = req.query.id;
    const customerEmail = req.query.email;
    let businessName = "";
    let reviewLink = "";

    if (!customerEmail || !businessId) {
        return res.render('pages/404');
    }

    await User.findOne({ businessId: businessId })
        .then(businessUser => {
            // if no user, show 404 page.
            if (!businessUser) {
                return res.render('pages/404');
            } else {
                businessName = businessUser.businessName;
                reviewLink = businessUser.reviewLink;
            }
        })
    if (businessName.length > 0 && customerEmail) {
        res.render('pages/review', {
            title: '5thstar | Customer Feedback',
            home: false,
            login: false,
            singUp: false,
            board: false,
            customerEmail: customerEmail,
            businessName: businessName,
            businessId: businessId,
            reviewLink: reviewLink,
        });
    }

};

/*************************************************
 * POST CUSTOMER REVIEW 
 * ***********************************************/
exports.postReviewPage = async (req, res, next) => {
    //Receive the Review stuff
    const feedbackStars = req.body.feedbackStars;
    const feedbackText = req.body.feedbackText;
    const customerEmail = req.body.customerEmail;
    const businessId = req.body.businessId;
    if (customerEmail && businessId) {
        await User.findOne({ businessId: businessId }).then(businessUser => {
            businessUser.customerFeedback.push(
                {
                    feedbackStars: Number(feedbackStars),
                    feedbackText: feedbackText,
                    customerEmail: customerEmail
                }
            );
            businessUser.save();
        });
        res.status(201);
    } else {
        res.status(200);
    }





};