//DotEnv
require('dotenv/config');


//Modules
const connection = require('./db/database');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TOKEN, {telegram: {webhookReply:false}});
const Activities = require("./db/Activities");
const Disciplines = require("./db/Disciplines");


//authenticate of database
connection
    .authenticate()
    .then(() => { 
        console.log("Successfully connected!");
    })
    .catch((msgErro) =>{ //se não conseguir
        console.log("Connection error!");
    })

    
//Start bot with options and welcome
/*
bot.read((ctx) => {
    let startMessage = "Welcome, this bot manages your reminders"
    ctx.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                [{text: "Activity record", callback_data: "ActivityR"},{text: "Class record", callback_data: "ClassR"}],
                [{text: "Activity delete", callback_data: "ActivityD"},{text: "Class delete", callback_data: "ClassD"}],
                [{text: "List reminders", callback_data: "List"}]
            ]
        }
    });
});
*/
//Commands
bot.command("help", (ctx) => {
    let commandText = ctx.message.text.match(/\/help (.+)/);
    if(commandText !== null){
        let param = commandText[1]
        switch (param) {
            case 'list':
                ctx.reply("show all activities");
                break;
            case 'activityr':
                ctx.telegram.sendMessage(ctx.from.id,`*Paramns:* \n           title | deadline | description | iddiscipline\n *Description:* \n         Save an activity`, {parse_mode: 'Markdown'});
                break;
            case 'discipliner':
                ctx.telegram.sendMessage(ctx.from.id,`*Paramns:* \n           name | time | link \n *Description:* \n          Save an discipliny`, {parse_mode: 'Markdown'});
                break;
            case 'activityd':
                ctx.reply("Delete a activity");
                break;
            case 'disciplined':
                ctx.reply("Delete a discipline");
                break;
        }
    }
    else{
        ctx.reply(`Write /help and the desired command name:
-list
-activityr
-discipliner
-activitiesd
-disciplined`)
       };
});


//Visualization
bot.command("list", (ctx) => {
    let message = `*List of activities:* \n`;
    Disciplines
        .findAll({ 
            raw: true
        })
        .then(disciplines => { 
            Activities.findAll({
                raw: true
            }).then(activities => {
                disciplines.forEach(discipline => {
                    message += `    *(${discipline.id}) ${discipline.name}* \n`;
                    activities.forEach(activity => {
                        if(activity.disciplineId == discipline.id){
                            message += ` \t \t \t \t \t  ${activity.title} \n`;
                        };
                    });
                });
                ctx.telegram.sendMessage(ctx.from.id, message, {parse_mode: 'Markdown'});
            });
        })
        .catch((err) => console.log(err));
});
bot.command("activitya", (ctx) =>{
    let commandText = ctx.message.text.match(/\/activitya (.+)/);
    let param = commandText[1].split("|");
    Activities.findOne({
        where: {title:param}
    }).then( activity => { 
        let data = new Date(activity.deadline);
        let formattedDate = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
        ctx.telegram.sendMessage(ctx.from.id,`*Title:* ${activity.title}\n*Description:* ${activity.description}\n*Deadline:* ${formattedDate}\n `,{parse_mode: 'Markdown'})
    });
});


//Records
bot.command("activityr",(ctx) => {
    let commandText = ctx.message.text.match(/\/activityr (.+)/);
    let paramns = commandText[1].split("|");
    for (let i = 0; i < paramns.length; i++){paramns[i] = paramns[i].trim();}

        Activities.create({
                title: paramns[0], 
                deadline: paramns[1],
                description: paramns[2],
                disciplineId: paramns[3]
        }).then("Record Succefull").catch((err) => {console.log(err)});
});
bot.command("discipliner",(ctx) => {
    let commandText = ctx.message.text.match(/\/discipliner (.+)/);
    let paramns = commandText[1].split("|");
    for (let i = 0; i < paramns.length; i++){paramns[i] = paramns[i].trim();}

        Disciplines.create({
                name: paramns[0], 
                time: paramns[1],
                link: paramns[2],
        }).then("Record Succefull").catch((err) => {console.log(err)})


});


//Deletes
bot.command("activityd", (ctx) => {
    let commandText = ctx.message.text.match(/\/activityd (.+)/);
    let param = commandText[1].split("|");

    Activities.destroy({
        where: {
            title: param
        }
    });
});


//Execute
bot.launch();