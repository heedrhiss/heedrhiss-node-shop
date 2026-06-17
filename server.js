const express = require('express')
const body = require('body-parser');
const path = require('path')

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop');
const mongoDB = require('./utils/database').mongoDB
const User = require('./models/user')

const app = express();

// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(body.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next)=> {
 User.findUserById('6a32a29db879e7dc27221632')
 .then(user => {
    req.user = new User(user.username, user.email, user._id, user.cart)
    next()
    }).catch(err => console.log(err))
})

app.use("/admin", adminRouter)
app.use(shopRouter)

app.use((req, res, next)=> {
 User.findUserById('6a32a29db879e7dc27221632')
 .then(user => {
    req.user = user    
    next()
    }).catch(err => console.log(err))
})

app.use((req, res) => {
    res.status(404).render("404", {pageTitle: "404 Not Found", path: ""})
})

mongoDB( ()=> {
    app.listen(3000)
})