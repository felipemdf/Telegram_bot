module.exports = {
    name: "/d_act",
    description: "Delete an activity",
    arguments: ["title"],
    run: function(ctx, args) {
        const Activities = require("../db/Activities");

        Activities.destroy({
            where: {
                title: args[0]
            }
        });
    }
}