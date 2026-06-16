// const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getHomePage)
router.get('/products', shopController.getProductsPage)
router.get('/product/:productId', shopController.getProduct)
// router.get('/cart', shopController.getCart)
// router.post('/cart', shopController.postCart)
// router.post('/cart/delete-item', shopController.postCartDelete)
// router.get('/orders', shopController.getOrders)
// router.post('/create-order', shopController.postOrders)

module.exports = router;