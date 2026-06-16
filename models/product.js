const mongoDB = require('mongodb')
const getDB = require('../utils/database').getDB

class Product  {
constructor(title, price, imgUrl, description, id){
    this.title = title;
    this.price = price
    this.imgUrl = imgUrl
    this.description = description
    this._id = id ? new mongoDB.ObjectId(String(id)) : null
}
 save(){
     const db = getDB()
    if(this._id){
        console.log(this)
        return db.collection('products').updateOne({_id: this._id}, {$set: this}).then(result => {
            console.log(result)
        })
        .catch(err => console.log(err))
    }else{
        return db.collection('products').insertOne(this).then(result => {
            console.log(result)
        })
        .catch(err => console.log(err))
    }
 }
 
 static fetchAllProducts(){
    const db = getDB()
    return db.collection('products').find().toArray()
    .then(products => {
        console.log(products)
        return products
    })
    .catch(err => console.log(err))
 }
 static findById(id) {
    const db = getDB()
    console.log(id)
    return db.collection('products').findOne({
        _id: new mongoDB.ObjectId(String(id))
      }).then(product => {
        return product
    })
    .catch(err => console.log(err))
 }

 static deleteById(id){
    const db = getDB()
    return db.collection('products').deleteOne({_id: new mongoDB.ObjectId(String(id))})
    .then(result => {
        console.log('deleted')
    }).catch(err => console.log(err))
 }
}

module.exports = Product;