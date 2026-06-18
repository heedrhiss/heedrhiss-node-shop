exports.getLogin = (req, res) => {
    res.render('login', {path: '/login', pageTitle: 'Login Page'})
}
