module.exports = {
    name: "/s_act",
    description: "Save an activity",
    arguments: ["title","deadline","description","discipline name"],
    run: function(ctx, args) {
        const Activities = require("../db/Activities");
        const Disciplines = require("../db/Disciplines");

        Disciplines.findOne({
            where: {name: args[3]}
        }).then(discipline => {
            Activities.create({
                title: args[0], 
                deadline: args[1],
                description: args[2],
                disciplineId: discipline.id
            });
        });
    }
}