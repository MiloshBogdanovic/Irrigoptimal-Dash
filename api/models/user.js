const Sequelize = require('sequelize');
const {sequelize} = require('../sequelize');


const User = sequelize.define('users', {
    // attributes
    name: {
    type: Sequelize.STRING,
    allowNull: false
    },
    email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
    },
    pass: {
        type: Sequelize.STRING,
        allowNull: false
        }

    }, {
    // options
    
    });

User.sync({ force: false })  

module.exports = {User}