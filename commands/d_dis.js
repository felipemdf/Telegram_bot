const Disciplines = require("../db/Disciplines");

module.exports = {
    name: "/d_dis",
    description: "Delete an discipline",
    arguments: ["name"],
    run: function(ctx, args) {
        const Disciplines = require("../db/Disciplines");

        Disciplines.destroy({
            where: {
                name: args[0]
            }
        });
    }
}