// const path = require('path');

const express = require('express');

const isAuth          = require('../middlewares/auth')
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getHomePage)
router.get('/products', shopController.getProductsPage)
router.get('/product/:productId', shopController.getProduct)
router.get('/cart', isAuth, shopController.getCart)
router.post('/cart', isAuth, shopController.postCart)
router.post('/cart/delete-item', isAuth, shopController.postCartDelete)
router.get('/orders', isAuth, shopController.getOrders)
router.post('/create-order', isAuth, shopController.postOrders)

module.exports = router;