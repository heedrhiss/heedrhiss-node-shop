const User      = require('../models/user')
const bycrypt   = require('bcryptjs')

exports.getLogin = (req, res) => {
    res.render('login', {path: '/login', pageTitle: 'Login Page', isAuthenticated: req.session.isLoggedIn})
}

exports.postLogin = (req, res)=> {
    const email = req.body.email
    const password = req.body.password

    User.findOne({email: email})
    .then(user => {        
        if(!user) return res.redirect('/login')
        return bycrypt.compare(password, user.password).then(matched => {
            if(!matched) return res.redirect('/login')
            req.session.isLoggedIn = true    
            req.session.user = user;
            req.session.save((err) => {
            if(err) return console.log(err)
            res.redirect('/')
            })
    }).catch(err => console.log(err))
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

exports.postSignup = (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    // const confirmPassword = req.body.confirmPassword
    User.findOne({email: email}).then(user => {
        if(user){
            return res.redirect('/signup')
        }
        return bycrypt.hash(password, 10).then(hashPassword => {
            const newUser = new User({name, email, password: hashPassword, cart: {item: []}})
            return newUser.save()
        }).then(()=> res.redirect('/login'))
    }).catch(err => console.log(err))
}