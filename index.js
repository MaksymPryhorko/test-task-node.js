const { Telegraf } = require("telegraf");
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
    }. Введите имя нового пользователя: /name.`
  );
  resetNewUser();
});

bot.command("name", (ctx) => {
  ctx.reply("Веддите имя нового пользователя!");
});

bot.command("age", (ctx) => {
  ctx.reply("Веддите возраст нового пользователя!");
});

bot.command("email", (ctx) => {
  ctx.reply("Веддите email нового пользователя!");
});

bot.command("sendNewUser", (ctx) => {
  ctx.reply("Отправляю нового пользователя на сервер");
  ctx.reply("Новый пользователь успешно отправлен на сервер.");
});

bot.on("text", async (ctx) => {
  if (newUser.name === null) {
    ctx.reply(
      `Имя нового пользователя "${ctx.message.text}". Теперь введите возраст нового пользователя /age. Если вы допустили ошибку - начните все заново с команды /start.`
    );
    changeDataNewUser("name", ctx.message.text);
    return;
  }

  if (newUser.age === null) {
    const age = Number.parseInt(ctx.message.text);
    if (age > 0) {
      ctx.reply(
        `Успешно. Возраст нового пользователя ${age} лет. Теперь введите email нового пользователя /email. Если вы допустили ошибку - начните все заново с команды /start.`
      );
      changeDataNewUser("age", age);
    } else
      ctx.reply(
        "Ошибка. Возраст должен быть больше нуля лет. Попробуйте еще раз, через команду /age"
      );
    return;
  }

  if (newUser.email === null) {
    const email = ctx.message.text;
    if (validateEmail(email)) {
      changeDataNewUser("email", email);
      ctx.reply(
        `Успешно. Новый пользователь создан. Имя: ${newUser.name}, Возраст: ${newUser.age}, Емейл: ${newUser.email}. Проверьте все денные. Если вы допустили ошибку - начните все заново с команды /start.
        Нажмите /sendNewUser для отправки нового пользователя на сервер.`
      );
    } else {
      ctx.reply(`Ошибка. ${email} - введен не корректно. Поробуйте еще раз, через команду /email`);
    }
    return;
  }
});

bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
