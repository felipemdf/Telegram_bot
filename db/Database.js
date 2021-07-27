const Sequelize = require ('sequelize');
const connection = new Sequelize('bottel','root','162001',{
    host:'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection; 