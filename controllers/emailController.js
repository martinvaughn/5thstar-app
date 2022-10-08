require('dotenv').config();
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


exports.sendEmailsToCustomersAsync = async (
    customers,  // List of emails // ,
    subjectLine, // string,
    message // string,
) => {
    // Create a comma separated string from toEmails
    const emails = ["martinvaughn16@gmail.com", "martinvaughn.io@gmail.com", "martin@bloom-mktg.com"]// customers.join(", ")

    let transporter = nodemailer.createTransport({
        host: "mail.smtp2go.com", // Ask mv if this breaks.
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/email-templates'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/email-templates'),
    };

    transporter.use('compile', hbs(handlebarOptions))

    for (var i = 0; i < emails.length; i++) {
        // send mail with transport object
        let info = await transporter.sendMail({
            from: '"Bills Bikes" <billsbikeandrun@bloom-mktg.info>', // sender address
            to: emails[i],
            subject: subjectLine,
            template: 'emailReviewersTemplate', // the name of the template file in views -> emailTemplate.handlebars
            context: {
                message: message // replace {{message}} in the template with sender
            }
        });
        console.log("Message sent: %s", info.messageId);
    }
}


exports.sendEmailsToCustomers = async (req, res, next) => {
    try {
        // const customers: any = req.body.customers!;
        // const businessUserId: string = req.body.businessUserId!;
        // const senderName: string = req.body.senderName!;
        const customers = [
            { name: "Cole MartinDale", email: "martinvaughn16@gmail.com", datePurchase: "10/20/2022" },
            { name: "MarvIn Lawn", email: "martinvaughn.io@gmail.com", datePurchase: "10/20/2022" },
            { name: "Johnny Goodseed", email: "vau18004@byui.edu", datePurchase: "10/20/2022" },
        ]
        const subjectLine = "Thanks!";
        const message = "Thank you for shopping with us. Can you spare a wee little review?";


        if (customers && subjectLine && message) {
            await sendEmailsToCustomersAsync(customers, subjectLine, message).catch((error) => {
                throw new Error(`Error sending emails async: ${error}`)
            });
            res.setHeader("Content-Type", "text/html");
            res.status(200).send("Emails Sent.");
        } else {
            throw new Error(`Email data is not complete.`);
        }
    } catch (error) {
        next(error);
    }
};


