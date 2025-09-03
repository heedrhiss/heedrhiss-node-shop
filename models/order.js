const Sequelize = require('sequelize');
const sequelize = require('../utils/database')

const Order = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

module.exports = Order