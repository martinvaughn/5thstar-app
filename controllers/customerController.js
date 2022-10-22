const User = require('../models/user');

/*************************************************
 * GET A LIST OF USER CUSTOMER FEEDBACK
 * ***********************************************/
exports.getCustomerFeedback = async (req, res, next) => {
    // This data will retrieved from req.user.customerFeedback
    const customerFeedbackRows = [
        { email: "martinvaughn16@gmail.com", feedbackStars: 4, feedbackText: "Excepteur velit irure laborum elit fugiat consectetur voluptate amet nisi. Enim incididunt qui sint laborum culpa nulla do. Ex cupidatat et sint sunt eu mollit esse. Sunt mollit ut ex pariatur pariatur sit ex mollit cillum velit cupidatat laboris. Aliqua est ex fugiat consectetur aute ex officia esse minim elit occaecat incididunt eu aliquip. Incididunt id veniam id ipsum adipisicing labore aute amet et velit. Sit labore ex excepteur tempor consectetur ut irure.", dateResponded: "10/20/2022" },
        { email: "martinvaughn.io@gmail.com", feedbackStars: 3, feedbackText: "I hated it and i hate everyone :-/", dateResponded: "10/20/2022" },
        { email: "colemartindalesbutt@gmail.com", feedbackStars: 5, feedbackText: "I REALLY LOVE BLOOM MKTG", dateResponded: "10/20/2022" },
        { email: "martinvaughn16@gmail.com", feedbackStars: 4, feedbackText: "I REALLY LOVE BLOOM MKTG", dateResponded: "10/20/2022" },
        { email: "martinvaughn.io@gmail.com", feedbackStars: 3, feedbackText: "I hated it and i hate everyone :-/", dateResponded: "10/20/2022" },
        { email: "colemartindalesbutt@gmail.com", feedbackStars: 5, feedbackText: "I REALLY LOVE BLOOM MKTG", dateResponded: "10/20/2022" },
    ]
    res.render('pages/feedback', {
        title: '5thstar | Customer Feedback',
        home: false,
        login: false,
        singUp: false,
        board: false,
        businessName: req.user.businessName,
        customerFeedbackRows: customerFeedbackRows,
    });
};

/*************************************************
 * GET A PAGE FOR A CUSTOMER TO LEAVE FEEDBACK.
 * ***********************************************/
exports.getReviewPage = async (req, res, next) => {
    const businessId = req.query.id;
    const customerEmail = req.query.email;
    let businessName = "";

    if (!customerEmail) {
        res.render('pages/404');
    }

    await User.findOne({ businessId: businessId })
        .then(businessUser => {
            // if no user, show 404 page.
            if (!businessUser) {
                res.render('pages/404');
            } else {
                businessName = businessUser.businessName;
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
            reviewLink: "www.wwww.www.owl.com",
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

    await User.findOne({ businessId: businessId }).then(businessUser => {
        console.log("YEEES");
        req.user.customerFeedback.push(
            {
                feedbackStars: feedbackStars,
                feedbackText: feedbackText,
                customerEmail: customerEmail
            }
        );
        req.user.save();
    });



    res.redirect('pages/404') // change this to be a thank you page.
};