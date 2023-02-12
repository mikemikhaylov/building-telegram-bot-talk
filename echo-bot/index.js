const {Telegraf} = require('telegraf');

const bot = new Telegraf('TOKEN');

// bot.use(async (ctx, next) => {
//     //next();
// });

bot.use(async (ctx, next) => {
    await ctx.reply(JSON.stringify(ctx.update, null, 2));
});

bot.launch();



process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
