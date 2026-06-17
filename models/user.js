const mongoDB = require('mongodb')

const getDB = require('../utils/database').getDB

 class User {
    constructor(username, email, id, cart){
        this.username = username
        this.email = email
        this.id = id ? new mongoDB.ObjectId(String(id)) : null
        this.cart = cart
    }

    save(){
        const db = getDB()
        if(id){
            return db.collection('users').updateOne({_id: id}, {$set: this})            
        }else{
            return db.collection('users').insertOne(this)           
        }
    }

    addToCart(product){
        const db = getDB()
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items]
        const cartItemIndex = this.cart.items.findIndex(item => {
            return item.productId.toString() === product._id.toString()
        })
        if(cartItemIndex >= 0){            
            newQuantity = this.cart.items[cartItemIndex].quantity + 1;
            updatedCartItems[cartItemIndex].quantity = newQuantity            
        }else{
            updatedCartItems.push({productId: new mongoDB.ObjectId(String(product._id)), quantity: 1})
        }        
        const updatedCart = {items: updatedCartItems}
        return db.collection('users').updateOne(
            {_id: new mongoDB.ObjectId(String(this.id))}, 
            {$set: {cart: updatedCart}}
            )
    }
    getCart(){
        const db = getDB()
        const productIds = this.cart.items.map(i => {
            return i.productId
        })        
        return db.collection('products').find({_id: {$in: productIds}}).toArray()
        .then(products => {
            return products.map(product => {
                return {...product, quantity: this.cart.items.find(i => {
                    return i.productId.toString() === product._id.toString()
                }).quantity}
            })
        }).catch(err => console.log(err))
    }

    deleteCartItem(id){
        const db = getDB()
        const updatedCartItems = this.cart.items.filter(item => {
          return  item.productId.toString() !== id.toString()
        })
        const updatedCart = {items: updatedCartItems}
        return db.collection('users').updateOne(
            {_id: new mongoDB.ObjectId(String(this.id))}, 
            {$set: {cart: updatedCart}}
            )
    }

    static findUserById(userId){
        const db = getDB()
        return db.collection('users').find({_id: new mongoDB.ObjectId(String(userId))}).next()
    }

    createOrder(){
        const db = getDB()
        return db.collection('orders').insertOne(this.cart)
        .then(order => {
            this.cart.items = []
            return db.collection('users')
            .updateOne({_id: new mongoDB.ObjectId(String(this.id))}, {$set: {cart: {items: []}}})
        }).catch(err => console.log(err))
    }
}

module.exports = User;