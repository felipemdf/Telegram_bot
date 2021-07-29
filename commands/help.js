module.exports = {
    name: "/help",
    description: "Show all bot commands",
    arguments: null,
    run: function(ctx, args) {
        if(args !== undefined){
            switch (args[0]) {
                case 'notes':
                    ctx.telegram.sendMessage(ctx.from.id,`*Paramns:* \n         Null \n*Description:* \n         Show all disciplines and their activities`, {parse_mode: 'Markdown'});
                    break;
                case 's_act':
                    ctx.telegram.sendMessage(ctx.from.id,`*Paramns:* \n         title | deadline | description | iddiscipline \n*Description:* \n         Save an activity`, {parse_mode: 'Markdown'});
                    break;
                case 's_dis':
                    ctx.telegram.sendMessage(ctx.from.id,`*Paramns:* \n         name | time | link \n *Description:* \n          Save an discipliny`, {parse_mode: 'Markdown'});
                    break;
                case 'd_act':
                    ctx.telegram.sendMessage(ctx.from.id,`*Paramns:* \n         WORKING... \n *Description:* \n          Delete a activity`, {parse_mode: 'Markdown'});
                    break;
                case 'd_dis':
                    ctx.telegram.sendMessage(ctx.from.id,`*Paramns:* \n         WORKING... \n *Description:* \n          Delete a discipline`, {parse_mode: 'Markdown'});
                    break;
	case 'v_act':
                    ctx.telegram.sendMessage(ctx.from.id,`*Paramns:* \n         WORKING... \n *Description:* \n          view an activity`,{parse_mode: 'Markdown'});
                    break;
            }
        }
        else{
            ctx.reply(`Write /help and the desired command name:
-list
- s_act
- s_dis
- d_act
- d_dis
- v_act`)
        }
    }
};