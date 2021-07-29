module.exports = {
    name: "/s_dis",
    description: "Save an discipliny",
    arguments: ["name","time","link"],
    run: function(ctx, args) {
        const Disciplines = require("../db/Disciplines");
        
        Disciplines.create({
                name: args[0], 
                time: args[1],
                link: args[2],
        });
    }
}