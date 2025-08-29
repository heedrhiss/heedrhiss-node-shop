const Sequelize = require('sequelize');
const sequelize = require('../utils/database')

const Cart = sequelize.define('carts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

module.exports = Cart