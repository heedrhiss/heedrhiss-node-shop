const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get("/add-product", adminController.getAddPage)
router.post("/add-product", adminController.postProduct)
router.get("/adminProduct", adminController.getAdminProduct)
router.get("/edit-product/:productId", adminController.getEditProduct)
router.post("/edit-product", adminController.postEditProduct)
router.post("/delete", adminController.postDelete)

module.exports = router;