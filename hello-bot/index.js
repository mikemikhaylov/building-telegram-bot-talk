const {Telegraf} = require('telegraf');

const bot = new Telegraf('TOKEN');

//https://telegraf.js.org/#middleware

bot.command('help', (ctx) => {
    ctx.reply(`
    The bot could greet people in different languages.
    The list of supported greetings:
    - hello - English
    - bonjour - French
    - hola - Spanish
    `);
});

bot.hears('hello', (ctx) => ctx.reply('hello'));
bot.hears('bonjour', (ctx) => ctx.reply('bonjour'));
bot.hears('hola', (ctx) => ctx.reply('hola'));

bot.on('text', (ctx) => ctx.reply(`Greeting "${ctx.update.message.text}" is not supported.`))

bot.launch();



process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
