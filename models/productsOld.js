const fs = require('fs');
const path = require('path')
const db = require('../utils/database')
const Cart = require('./cart')

const dataPath = path.join(__dirname, '..', 'data', 'products.json');

module.exports = class Product {
    constructor(id, title, price, imgUrl, description) {
    this.id = id
    this.title = title
    this.price = price
    this.imgUrl = imgUrl
    this.description = description
    }
    save() {
        if (this.id) {
            db.execute('UPDATE products SET title = ?, price = ?, imgUrl = ?, description = ? WHERE id = ?', [this.title, this.price, this.imgUrl, this.description, this.id])
        }
       return db.execute('INSERT INTO products (title, price, imgUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imgUrl, this.description])
        // let products = []
        // fs.readFile(dataPath, (err, data) => {
        //     if (!err) {
        //         products = JSON.parse(data)
        //         if (this.id) {
        //             const existingIndex = products.findIndex(item => item.id === this.id)
        //             const updatedProduct = [...products];
        //             updatedProduct[existingIndex] = this
        //              fs.writeFile(dataPath, JSON.stringify(updatedProduct), (err) => {
        //                 console.log(err)
        //             })
        //         } else {
        //             this.id = Math.random().toString();
        //             products.push(this);
        //             fs.writeFile(dataPath, JSON.stringify(products), (err) => {
        //                 console.log(err)
        //             })
        //         }
        //     }
        // })
    }

    static fetchProducts() {
       return db.execute('SELECT * FROM products')
        // fs.readFile(dataPath, (err, data) => {
        //     if (err) {
        //        return callBack([])
        //     } else {   
        //         callBack(JSON.parse(data))
        //     }
        // })
    }

    static findProduct(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
    // static findProduct(id, callBack) {
    //     fs.readFile(dataPath, (err, data) => {
    //         if (err) {
    //            return callBack([])
    //         }
    //         const products = JSON.parse(data)
    //         const product = products.find(item => item.id === id)
    //         callBack(product)
    //     })
    // }

    static deleteProduct(id) {
        fs.readFile(dataPath, (err, data) => {
            if (err) {
               return
            }
            const products = JSON.parse(data)
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(item => item.id !== id)
            
            fs.writeFile(dataPath, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                   Cart.deleteCartItem(id, product.price)
              }
            })
        })
    }
}