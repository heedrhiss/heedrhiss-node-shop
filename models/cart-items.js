const Sequelize = require('sequelize');
const sequelize = require('../utils/database')

const CartItem = sequelize.define('cartItems', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER
})

module.exports = CartItem