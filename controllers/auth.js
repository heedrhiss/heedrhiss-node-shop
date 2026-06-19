exports.getLogin = (req, res) => {
    res.render('login', {path: '/login', pageTitle: 'Login Page', isAuthenticated: req.session.isLoggedIn})
}

exports.postLogin = (req, res)=> {
    req.session.isLoggedIn = true
    res.redirect('/')
}
