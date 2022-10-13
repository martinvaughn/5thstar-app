/*************************************************
 * GET A LIST OF USER CUSTOMER FEEDBACK
 * ***********************************************/
exports.getCustomerFeedback = async (req, res, next) => {
    // This data will retrieved from req.user.customerFeedback
    const getCustomerFeedbackRows = [
        { email: "martinvaughn16@gmail.com", feedbackStars: 4, feedbackText: "I REALLY LOVE BLOOM MKTG", dateResponded: "10/20/2022" },
        { email: "martinvaughn.io@gmail.com", feedbackStars: 3, feedbackText: "I hated it and i hate everyone :-/", dateResponded: "10/20/2022" },
        { email: "colemartindalesbutt@gmail.com", feedbackStars: 5, feedbackText: "I REALLY LOVE BLOOM MKTG", dateResponded: "10/20/2022" },
        { email: "martinvaughn16@gmail.com", feedbackStars: 4, feedbackText: "I REALLY LOVE BLOOM MKTG", dateResponded: "10/20/2022" },
        { email: "martinvaughn.io@gmail.com", feedbackStars: 3, feedbackText: "I hated it and i hate everyone :-/", dateResponded: "10/20/2022" },
        { email: "colemartindalesbutt@gmail.com", feedbackStars: 5, feedbackText: "I REALLY LOVE BLOOM MKTG", dateResponded: "10/20/2022" },
    ]

    res.render('pages/customer-feedback', {
        title: '5thstar | Customer Feedback',
        home: false,
        login: false,
        singUp: false,
        board: false,
        customerFeedback: customerFeedbackRows,
    });
};

/*************************************************
 * GET A PAGE FOR A CUSTOMER TO LEAVE FEEDBACK.
 * ***********************************************/
exports.getReviewPage = async (req, res, next) => {
    // const customerEmail = req.queryString.email;  // Retrieve the email from the URL.
    const customerEmail = "martinvaughn16@gmail.com"

    res.render('pages/review', {
        title: '5thstar | Customer Feedback',
        home: false,
        login: false,
        singUp: false,
        board: false,
        customerEmail: customerEmail,
    });
};