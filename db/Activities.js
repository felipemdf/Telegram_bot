const Sequelize = require ('sequelize');
const connection = require ('./Database');
const Activities = connection.define('activity',{
    title:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    deadline:{
        type: Sequelize.DATE,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    disciplineId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


/*
Activities.sync({force: false}).then(() =>{
    console.log("table has been created");
})
*/

module.exports = Activities; 