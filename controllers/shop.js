const Product = require('../models/product') 
const Order = require('../models/order') 


exports.getHomePage = (req, res) => {      
    res.render("shop/index", {pageTitle: "Heedrhiss Shop", path: "/", isAuthenticated: req.session.isLoggedIn})
}

exports.getProductsPage = (req, res) => {
   Product.find()
   // .select('title price -_id')
   .populate('userId', 'name -_id')
   .then((products) => {            
       res.render("shop/products-lists", {prods: products, pageTitle: "Products", path: "/products", isAuthenticated: req.session.isLoggedIn})
   })
   .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
   const id = req.params.productId
   Product.findById(id).then((product) => {
      res.render("shop/product-details", {product: product, pageTitle: `Product Item: ${id}`, path: '/products', isAuthenticated: req.session.isLoggedIn})
   }).catch(err => {
      console.log(err)
      res.status(500).render('404', {pageTitle: 'Error', path: ''})
   })
}

exports.getCart = (req, res) => {
   req.user.populate('cart.items.productId')   
   .then(user => {            
      res.render("shop/cart", {pageTitle: "Cart", path: "/cart", products: user.cart.items, isAuthenticated: req.session.isLoggedIn})
   }).catch(err => {
      console.log(err)
      res.status(500).render('404', {pageTitle: 'Error in cart', path: ''})
   })
}

exports.postCart = (req, res) => {
   const id = req.body.productId;
   Product.findById(id).then(product => {
      return req.user.addToCart(product)
   }).then(() => {      
      res.redirect('/cart')
   }).catch(err => console.log(err))
}

exports.postCartDelete = (req, res) => {
   const id = req.body.productId;
   req.user.deleteCartItem(id)
   .then(()=> { res.redirect('/cart') })
   .catch(err => console.log(err))
}

exports.getOrders = (req, res) => {
   Order.find({'user.userId': req.user._id})
   .then(orders => {            
      res.render("shop/orders", {pageTitle: "Your Orders", path: "/orders", orders: orders, isAuthenticated: req.session.isLoggedIn})
   }).catch(err => console.log(err))

}

exports.postOrders = (req, res) => {   
   req.user.populate('cart.items.productId')
   .then(user => {
      const products = user.cart.items.map(item => {
         return {quantity: item.quantity, product: {...item.productId._doc}}
      })
      const order = new Order({products, user: {name: req.user.name, userId: req.user}})
      return order.save()
   })
   .then(() => {      
      req.user.emptyCart().then(()=> {
         res.redirect('/orders')})      
   }).catch(err => console.log(err))   
   .catch(err => console.log(err))
}