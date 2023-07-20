const { Telegraf, Scenes, session } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();
const { BOT_TOKEN } = process.env;
const composer = require("./start.composer");
const bot = new Telegraf(BOT_TOKEN);
const newUserScene = require("./newUserScene");

bot.context.newUser = {
  name: null,
  age: null,
  email: null,
};

const stage = new Scenes.Stage([newUserScene]);
bot.use(session());
bot.use(stage.middleware());
bot.use(composer);

bot.launch().then(console.log("TelegramBot started."));

module.exports = bot;
