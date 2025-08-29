const Product = require('../models/product') 
const Cart = require('../models/cart');
const { where } = require('sequelize');

exports.getHomePage = (req, res) => {
    res.render("shop/index", {pageTitle: "Heedrhiss Shop", path: "/"})
}

exports.getProductsPage = (req, res) => {
   Product.findAll().then((products) => {
       res.render("shop/products-lists", {prods: products, pageTitle: "Products", path: "/products"})
   })
   .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
   const id = req.params.productId
   Product.findAll({
      where: {
         id: id
      }
   }).then((products) => {
      res.render("shop/product-details", {product: products[0], pageTitle: `Product Item: ${id}`, path: '/products'})
   }).catch(err => {
      console.log(err)
      res.status(500).render('404', {pageTitle: 'Error', path: ''})
   })
}

exports.getCart = (req, res) => {
   req.user.getCart().then(cart => {
      return cart.getProducts()
   }).then(products => {
      res.render("shop/cart", {pageTitle: "Cart", path: "/cart", products: products})
   }).catch(err => {
      console.log(err)
      res.status(500).render('404', {pageTitle: 'Error', path: ''})
   })

}

exports.postCart = (req, res) => {
   const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
         console.log(product.cartItems.quantity)
        const oldQuantity = parseInt(product.cartItems.quantity);
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postCartDelete = (req, res) => {
   const id = req.body.productId;
   Product.findProduct(id, (product) => {
      Cart.deleteCartItem(id, product.price)
      res.redirect('/cart')
   })
}

exports.getOrders = (req, res) => {
   res.render("shop/orders", {pageTitle: "Your Orders", path: "/orders"})
}