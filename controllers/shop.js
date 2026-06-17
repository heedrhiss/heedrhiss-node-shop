const Product = require('../models/product') 

exports.getHomePage = (req, res) => {
    res.render("shop/index", {pageTitle: "Heedrhiss Shop", path: "/"})
}

exports.getProductsPage = (req, res) => {
   Product.fetchAllProducts().then((products) => {
       res.render("shop/products-lists", {prods: products, pageTitle: "Products", path: "/products"})
   })
   .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
   const id = req.params.productId
   Product.findById(id).then((product) => {
      res.render("shop/product-details", {product: product, pageTitle: `Product Item: ${id}`, path: '/products'})
   }).catch(err => {
      console.log(err)
      res.status(500).render('404', {pageTitle: 'Error', path: ''})
   })
}

exports.getCart = (req, res) => {
   req.user.getCart().then(products => {      
      res.render("shop/cart", {pageTitle: "Cart", path: "/cart", products: products})
   }).catch(err => {
      console.log(err)
      res.status(500).render('404', {pageTitle: 'Error in cart', path: ''})
   })
}

exports.postCart = (req, res) => {
   const id = req.body.productId;
   Product.findById(id).then(product => {
      return req.user.addToCart(product)
   }).then(result => {      
      res.redirect('/cart')
   }).catch(err => console.log(err))
}

exports.postCartDelete = (req, res) => {
   const id = req.body.productId;
   req.user.deleteCartItem(id)
   .then(()=> { res.redirect('/cart') })
   .catch(err => console.log(err))
}

// exports.getOrders = (req, res) => {
//    req.user.getOrders({include: ['products']})
//    .then(orders => {
//       res.render("shop/orders", {pageTitle: "Your Orders", path: "/orders", orders: orders})
//    }).catch(err => console.log(err))

// }

exports.postOrders = (req, res) => {   
   req.user.createOrder()
   .then(()=> res.redirect('/orders'))
   .catch(err => console.log(err))
}