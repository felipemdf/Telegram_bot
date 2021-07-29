module.exports = {
    name: "/notes",
    description: "Show all disciplines and their activities",
    arguments: null,
    run: function(ctx, args){
        const Activities = require("../db/Activities");
        const Disciplines = require("../db/Disciplines");

        let message = `*List of activities:* \n`;

        Disciplines
            .findAll({ 
                raw: true
            }).then(disciplines => {
                Activities.findAll({
                    raw: true
                }).then(activities => {
                    disciplines.forEach(discipline =>{
                        message += `    *${discipline.name}* \n`;
                        activities.forEach(activity => {
                            if(activity.disciplineId == discipline.id){
                                message += ` \t \t \t \t \t  ${activity.title} \n`;
                            };
                        });
                    });
                    ctx.telegram.sendMessage(ctx.from.id, message, {parse_mode: 'Markdown'});
                });
            });
    }
}