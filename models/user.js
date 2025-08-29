const Sequelize = require('sequelize');
const sequelize = require('../utils/database')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: Sequelize.STRING,
})

module.exports = User;