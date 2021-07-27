const { Telegraf } = require('telegraf');
const bot = new Telegraf("1926411915:AAFVh7GJtnTkcKVwGchm_vlk44YZmLS0Ikg");

bot.start((ctx) => {
    ctx.reply(`${ctx.from.first_name} have entered the start command`);
});

bot.help((ctx) => {
    ctx.reply(`${ctx.from.first_name} have entered the help command`);
});

bot.settings((ctx) => {
    ctx.reply(`${ctx.from.first_name} have entered the settings command`);
});

//hears= emote ou texto
bot.hears("cat", (ctx) => {
    ctx.reply("Meow");
});

//Update types

bot.on("sticker", (ctx) => {
    ctx.reply("This is a sticker message");
});

//Markup
bot.command('lembrete',(ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Escolha uma opção', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Cadastrar tarefa', callback_data: 'CadastrarTarefa'},{text: 'Cadastrar aula', callback_data: 'CadastrarTarefa'}],
                [{text: 'Excluir tarefa', callback_data: 'ExcluirTarefa'},{text: 'Escluir aula', callback_data: 'ExcluirAula'}],
                [{text: 'Listar lembretes', callback_data: 'ListarLembretes'}]
            ]
        }
    })
})

//Funçoes
bot.action("ListarLembretes", (ctx) => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Lembretes: \nlembrete1, \nlembrete2', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Menu', callback_data: 'menu'}]
            ]
        }
    })
})

bot.action("menu", ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, 'Escolha uma opção', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Cadastrar tarefa', callback_data: 'CadastrarTarefa'},{text: 'Cadastrar aula', callback_data: 'CadastrarTarefa'}],
                [{text: 'Excluir tarefa', callback_data: 'ExcluirTarefa'},{text: 'Escluir aula', callback_data: 'ExcluirAula'}],
                [{text: 'Listar lembretes', callback_data: 'ListarLembretes'}]
            ]
        }
    })
})

bot.launch();

 /**
  * Métodos: Use, on, mention, hears, command (Tudo que vai com o bot
  * Context Property: reply, message, telegram, from, poll (Tudo que vai com o ctx)
  */