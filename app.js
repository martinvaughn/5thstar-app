require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const cron = require('node-cron');
const emailController = require("./controllers/emailController");

const User = require("./models/user");

//import config
// const Config = require("./configPrivatInfo")

// Connecct to Heroku || localhost:5000 || data base
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL;

//Initiliaze the express object to manager some of the functionality
const app = express();

//Initialize the MongoDBStore for session user
const reviewsSession = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions' // or thanksdb
});

//Initialize csrf
const csrfProtection = csrf()

//Setting up for deployin on Heroku
const corsOptions = {
    origin: process.env.APP_URL,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

//Setting up Data Base Options
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

//Require the routers
const errorController = require('./routes/error')
const mainPagesRoutes = require('./routes/routerPages');
const authRoutes = require('./routes/auth');


app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');

//Section Middleware
app.use(bodyParser({ extended: false }));
app.use(
    session({
        secret: process.env.MONGODB_SECRET,
        resave: false,
        saveUninitialized: false,
        store: reviewsSession
    }));


//CSRF Middleware | Flash 
app.use(csrfProtection)
    .use(flash())
    .use((req, res, next) => {
        if (!req.session.user) {
            return next();
        }
        User.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err));
    })

    /**************************
     * Note You might need to revise the status for
     * having the user loggin in a session already
     */

    //CSRF Middleware
    .use((req, res, next) => {
        res.locals.isAuthenticated = req.session.isLoggedIn;
        res.locals.csrfToken = req.csrfToken();
        next();
    });

//Main Middleware
app.use(authRoutes)
    .use(mainPagesRoutes)
    .use(errorController.error500)
    .use(errorController.get404);

// Email Cron Job.
cron.schedule('*/10 * * * * *', async () => {
    console.log('Running email task')
    const cursor = User.find().cursor();
    for (let user = await cursor.next(); user != null; user = await cursor.next()) {
        const customers = user.emailQueue.slice(-2);
        const customersArray = customers.toObject();
        if (customersArray.length > 0) {
            await emailController.sendEmailsToCustomersAsync(user, customersArray).catch((error) => {
                throw new Error(`Error sending emails async: ${error}`)
            });
            await User.updateOne({ _id: user._id }, {
                $pullAll: { emailQueue: customers },
            });
            console.log("Successfuly Removed Customers...", customersArray.length)
        }
    }
});

//CONNECTION
mongoose
    .connect(
        MONGODB_URL, options
    )
    .then(result => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });