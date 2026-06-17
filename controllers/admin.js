const Product = require("../models/product")

exports.getAddPage = (req, res, next) => {
   // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
   res.render("admin/add-product", {pageTitle: "Add Product",  path: "/add-product", edit: false})
}

exports.postProduct = (req, res) => {
   const title = req.body.title
   const price = req.body.price
   const imgUrl = req.body.imgUrl
   const description = req.body.description
   const userId = req.user._id

   const products = new Product(title, price, imgUrl, description, null, userId)
   products.save()
   .then((result) => {      
      res.redirect('/products')
   }).catch(err => {
      console.log(err)
   })
}

exports.getAdminProduct = (req, res) => {
   Product.fetchAllProducts().then((products) => {
     res.render('admin/product-list', {
         prods: products,
         pageTitle: "Admin Product Page", path: "/adProduct"
      })
   }).catch(err => {
      console.log(err)
      res.status(500).render('404', {pageTitle: 'Error', path: ''})
   })
}

exports.getEditProduct = (req, res) => {
   const editMode = req.query.edit;
   const id = req.params.productId
   Product.findById(id).then((product) => {
      if (!product || !editMode) {
         return res.redirect('/')
      }
      res.render('admin/add-product',
         {
            product: product, pageTitle: `Edit ${id} Product`,
            edit: editMode, path: "/adProduct"
         })
   }).catch(err => {
      console.log(err)
      res.status(500).render('404', {pageTitle: 'Error', path: ''})
   })
}

exports.postEditProduct = (req, res, next) => {
   const id = req.body.productId;
   const title = req.body.title;
   const price = req.body.price;
   const imgUrl = req.body.imgUrl;
   const description = req.body.description;   
   const product = new Product(title, price, imgUrl, description, id, req.user._id);
   product.save().then(() =>    res.redirect("/admin/adminProduct"))
   .catch(err => console.log(err))
}

exports.postDelete = (req, res) => {
   const id = req.body.productId;
   Product.deleteById(id)
   .then(()=> res.redirect("/admin/adminProduct"))
   .catch(err => console.log(err))
}