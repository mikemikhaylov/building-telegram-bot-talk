const {Telegraf, Markup} = require('telegraf');

const bot = new Telegraf('TOKEN');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getCoinSide = () => getRandomInt(0, 1) === 0 ? 'Heads' : 'Trails';

//==================================

const coinInlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Flip again', 'flip_a_coin'),
]);
console.log(`coinInlineKeyboard: ${JSON.stringify(coinInlineKeyboard)}`);

bot.hears('Flip a coin', ctx => ctx.reply(getCoinSide(), coinInlineKeyboard));
bot.action('flip_a_coin', async(ctx) => {
    await ctx.editMessageText(`${getCoinSide()}\nEdited: ${new Date().toISOString()}`, coinInlineKeyboard);
});

const getRandomNumber = () => getRandomInt(0, 100);
const numberInlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Generate new', 'random_number'),
]);
bot.hears('Random number', ctx => ctx.reply(getRandomNumber().toString(), numberInlineKeyboard));
bot.action('random_number', async(ctx) => {
    await ctx.editMessageText(`${getRandomNumber()}\nEdited: ${new Date().toISOString()}`, numberInlineKeyboard);
});

const replyKeyboard = Markup
    .keyboard([
        ['Flip a coin', 'Random number'],
    ]).resize();

console.log(`replyKeyboard: ${JSON.stringify(replyKeyboard)}`);

bot.use(async (ctx) => {
    await ctx.reply('What to do?', replyKeyboard)
});

bot.launch();



process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
