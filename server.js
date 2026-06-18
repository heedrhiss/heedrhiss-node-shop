const express = require('express')
const body = require('body-parser');
const mongoose = require('mongoose');

const path = require('path')

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

app.use((req, res, next)=> {
 User.findById('6a33dc6e861e12b97762dbcb')
 .then(user => {
    req.user = user
    next()
    }).catch(err => console.log(err))
})

app.use("/admin", adminRouter)
app.use(shopRouter)
app.use(authRouter)


app.use((req, res) => {
    res.status(404).render("404", {pageTitle: "404 Not Found", path: ""})
})

// mongoDB( ()=> {
//     app.listen(3000)
// })

mongoose.connect('mongodb+srv://heedrhiss:olowofenira@nodecluster.agoojqm.mongodb.net/shop?retryWrites=true&w=majority&appName=NodeCluster').then(res => {
    User.findOne().then(user =>{
        if(!user){
            const user = new User(
                {name: 'heedrhiss', email: 'heedrhiss@test.com', cart: {items: []}}
                )
                user.save()
            }            
        app.listen(3000)
    })
}).catch(err => console.log(err))