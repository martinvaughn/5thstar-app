//Import the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const User = require("./models/user");

//import config
const Config = require("./configPrivatInfo")

// Connecct to Heroku || localhost:5000 || data base
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || Config.db;

//Initiliaze the express object to manager some of the functionality
const app = express();

//Initialize the MongoDBStore for session user
const homeofficeSession = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});

//Initialize csrf
const csrfProtection = csrf()

//Setting up for deployin on Heroku
const corsOptions = {
    origin: Config.myUrl,
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
        secret: Config.mySecret,
        resave: false,
        saveUninitialized: false,
        store: homeofficeSession
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