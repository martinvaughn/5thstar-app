//Handle the 404 page
exports.get404 = (req, res, next) => {
    res.render('pages/404')
};

//Handle the 500 Page
exports.error500 = (error, req, res, next) => {
    res.status(500).render('pages/500', {
        isAuthenticated: req.session.isLoggedIn
    });
};