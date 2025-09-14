const express = require('express')
const body = require('body-parser');
const path = require('path')

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop');
const mongoDB = require('./utils/database').mongoDB

const app = express();

// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(body.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use("/admin", adminRouter)
app.use(shopRouter)

// app.use((req, res, next) => {
//     res.status(404).render("404", {pageTitle: "404 Not Found", path: ""})
// })

mongoDB( ()=> {
    app.listen(3000)
})