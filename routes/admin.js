const express = require('express');
const adminController = require('../controllers/admin');
const isAuth          = require('../middlewares/auth')

const router = express.Router();

router.get("/add-product", isAuth, adminController.getAddPage)
router.post("/add-product", isAuth, adminController.postProduct)
router.get("/adminProduct", isAuth,  adminController.getAdminProduct)
router.get("/edit-product/:productId", isAuth,  adminController.getEditProduct)
router.post("/edit-product", isAuth,  adminController.postEditProduct)
router.post("/delete", isAuth,  adminController.postDelete)

module.exports = router;