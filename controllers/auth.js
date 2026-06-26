const User = require('../models/user')

exports.getLogin = (req, res) => {
    res.render('login', {path: '/login', pageTitle: 'Login Page', isAuthenticated: req.session.isLoggedIn})
}

exports.postLogin = (req, res)=> {
    User.findById('6a33dc6e861e12b97762dbcb')
    .then(user => {        
        req.session.isLoggedIn = true    
        req.session.user = user;
        req.session.save((err) => {
        if(err) return console.log(err)
        res.redirect('/')
        })
    }).catch(err => console.log(err))
}

exports.postLogout = (req, res)=> {
    req.session.destroy((err)=> {
        if(err) return console.log(err)
        res.redirect('/login')
    })
}

exports.getSignup = (req, res) => {
    res.render('signup', {pageTitle: 'Sign up page', path: '/signup', isAuthenticated: req.session.isLoggedIn})
}

exports.postSignup = (req, res) => {}