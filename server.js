const express = require('express')
const body = require('body-parser');
const path = require('path')

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop');
const sequelize = require('./utils/database')
const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-items')
const Order = require('./models/order')
const OrderItem = require('./models/order-items')

const app = express();

// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(body.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next)=> {
    User.findByPk(1).then((user)=>{
        req.user = user
        next()
    })
})

app.use("/admin", adminRouter)
app.use(shopRouter)

app.use((req, res, next) => {
    res.status(404).render("404", {pageTitle: "404 Not Found", path: ""})
})

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsToMany(Product, { through: CartItem})
Product.belongsToMany(Cart, { through: CartItem})
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem})
Product.belongsToMany(Order, { through: OrderItem})

sequelize.sync(
    // {force: true}
    ).then(result => {
    // console.log(result)
    return User.findByPk(1)
}).then((user) => {
    if(!user) {
       return User.create({name: "Heedrhiss", email: 'Heedrhiss@test.com'})
    }
    return user
}).then((user) => {
    return user.getCart().then(cart => {
        if (!cart) {
            return user.createCart();
        }
        return cart;
    });
}).then(cart => {
    // console.log(cart)
    app.listen(3000);
}).catch(err => console.log(err))
