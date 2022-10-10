require('dotenv').config();
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


exports.sendEmailsToCustomersAsync = async (
    customers,  // List of customer objects 
    subjectLine, // string
    message // string
) => {
    // Create a comma separated string from toEmails
    const emails = [];
    customers.forEach(customer => {
        if (customer.email.length > 1) {
            emails.push(customer.email);
        }
    })

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
        // const customers = req.body.customers!;
        // const fileName = req.body.fileName!;
        const fileName = "fileName.js";
        const customers = [
            { name: "Cole MartinDale", email: "martinvaughn16@gmail.com", datePurchased: "10/20/2022" },
            { name: "MarvIn Lawn", email: "martinvaughn.io@gmail.com", datePurchased: "10/20/2022" },
            { name: "Johnny Goodseed", email: "contact@thanks.rip", datePurchased: "10/20/2022" },
        ]
        const subjectLine = "Thanks!";
        const message = "Thank you for shopping with us. Can you spare a wee little review?";


        if (customers && subjectLine && message) {
            // await sendEmailsToCustomersAsync(customers, subjectLine, message).catch((error) => {
            //     throw new Error(`Error sending emails async: ${error}`)
            // });
            req.user.uploads.push({ purchases: customers.length, fileName: fileName, status: "Delivered" })
            req.user.save();
            res.setHeader("Content-Type", "text/html");
            res.status(200).send("Emails Sent.");
        } else {
            throw new Error(`Email data is not complete.`);
        }
    } catch (error) {
        next(error);
    }
};


