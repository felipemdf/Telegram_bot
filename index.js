//DotEnv
require('dotenv/config');


//Modules
const connection = require('./db/database');
const { Telegraf } = require('telegraf');
const fs = require("fs");
const bot = new Telegraf(process.env.TOKEN, {telegram: {webhookReply:false}});
const Activities = require("./db/Activities");
const Disciplines = require("./db/Disciplines");
const { log } = require('console');


//Call the command
bot.on(`text`, (ctx) => {
    let command = ctx.message.text.match(/^(?<palavra>[^\s]*)/)[0].trim();//retorna o commando ex: help
    let commandName = command.substr(1);
    let rg = new RegExp(`${command}(.+)`); //cria o regex
    let message = ctx.message.text.match(rg); //retorna [toda a mensagem, argumentos]
    
    var fileCommand = require(`./commands/${commandName}.js`);

    if(message !== null){
        let args = message[1].split("|");
        for(let i=0; i < args.length; i++){args[i] = args[i].trim()} //retira espaço de todos os parametros
        fileCommand.run(ctx, args);
    }
    else{
        fileCommand.run(ctx);
    }
})


//authenticate of database
connection
    .authenticate()
    .then(() => { 
        console.log("Successfully connected!");
    })
    .catch((msgErro) =>{ //se não conseguir
        console.log("Connection error!");
    })


//Execute
bot.launch();