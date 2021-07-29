const Sequelize = require ('sequelize');
const connection = require ('./Database');
const Activities = require("./Activities");

const Disciplines = connection.define('discipline',{
    name:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    time:{ //ALTERA ISSO PARA DIA DA SEMANA
        type: Sequelize.DATE,
        allowNull: false
    },
    link:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});


//Relationship
Activities.belongsTo(Disciplines); //1 articles for 1 category (1-1)
Disciplines.hasMany(Activities); //N categories for 1 article (1-N)

Disciplines.sync().then(() =>{
    console.log("table has been created");
})


module.exports = Disciplines; 