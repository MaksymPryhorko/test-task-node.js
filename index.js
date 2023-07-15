const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
console.log("Start Bot");

const newUser = {
  name: null,
  age: null,
  email: null,
};

const resetNewUser = function () {
  newUser.name = null;
  newUser.age = null;
  newUser.email = null;
};

const changeDataNewUser = function (key, value) {
  newUser[key] = value;
};

const validateEmail = function (email) {
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
};

bot.start((ctx) => {
  ctx.reply(
    `Welcome, ${
      ctx.from.first_name ? ctx.from.first_name : "Unknown"
    }. Команды для ввода нового пользователя: /name, /age, /email`
  );
  resetNewUser();
});

bot.command("name", (ctx) => {
  ctx.reply("Веддите имя нового пользователя!");
  bot.on("text", (ctx) => {
    if (newUser.name === null) {
      ctx.reply(
        `Имя нового пользователя "${ctx.message.text}". Теперь введите возраст /age и email /email.`
      );
      changeDataNewUser("name", ctx.message.text);
    }
  });
});

bot.command("age", (ctx) => {
  ctx.reply("Веддите возраст нового пользователя!");
  bot.on("text", (ctx) => {
    const age = Number.parseInt(ctx.message.text);
    if (age > 0) {
      ctx.reply(`Успешно. Возраст нового пользователя ${age} лет. Теперь введите email /email.`);
      changeDataNewUser("age", age);
    } else
      ctx.reply(
        "Ошибка. Возраст должен быть больше нуля лет. Попробуйте еще раз, через команду /age"
      );
  });
});

bot.command("email", (ctx) => {
  ctx.reply("Веддите email нового пользователя!");
  bot.on("text", (ctx) => {
    const email = ctx.message.text;
    if (validateEmail(email)) {
      changeDataNewUser("email", email);
      ctx.reply(`Успешно. ${email} - email нового пользователя.`);
    } else {
      ctx.reply(`Ошибка. ${email} - введен не корректно. Поробуйте еще раз, через команду /email`);
    }
  });
});

bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
