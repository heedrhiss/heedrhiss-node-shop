const express       = require('express')
const body          = require('body-parser');
const mongoose      = require('mongoose');
const session       = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session);
const path           = require('path')


const DB_URI = 'mongodb+srv://heedrhiss:olowofenira@nodecluster.agoojqm.mongodb.net/shop?retryWrites=true&w=majority&appName=NodeCluster'

const sessionStore = new MongoDBSession({
    uri: DB_URI,
    collection: 'sessions',
    // expires: 7200
})

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop');
const authRouter = require('./routes/auth')
const User = require('./models/user')

const app = express();

// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(body.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret: 'my_dark_lil_secret', resave: false, saveUninitialized: false, store: sessionStore}))

app.use((req, res, next)=> {
if(!req.session.user) return next();
 User.findById(req.session.user._id)
 .then(user => {    
    req.user = user
    next()
    }).catch(err => console.log(err))
})

app.use("/admin", adminRouter)
app.use(shopRouter)
app.use(authRouter)


app.use((req, res) => {
    res.status(404).render("404", {pageTitle: "404 Not Found", path: "", isAuthenticated: req.session.isLoggedIn})
})

mongoose.connect(DB_URI).then(res => {  
        app.listen(3000)
}).catch(err => console.log(err))