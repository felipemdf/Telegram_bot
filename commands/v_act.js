module.exports = {
    name: "/v_act",
    description: "View an activity",
    arguments: ["title"],
    run: function(ctx, args) {
        const Activities = require("../db/Activities");
        const Disciplines = require("../db/Disciplines");

        Activities.findOne({
            where: {title:args[0]},
            include: [{model: Disciplines}]
        }).then(activity => {
            let data = new Date(activity.deadline);
            let formattedDate = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`

            ctx.telegram.sendMessage(ctx.from.id,`*Title:* ${activity.title}\n*Discipline:* ${activity.discipline.name}\n*Description:* ${activity.description}\n*Deadline:* ${formattedDate}\n `,{parse_mode: 'Markdown'})
        });
    }
}