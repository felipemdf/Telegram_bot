const Sequelize = require ('sequelize');
const connection = require ('./Database');
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



Disciplines.sync().then(() =>{
    console.log("table has been created");
})


module.exports = Disciplines; 