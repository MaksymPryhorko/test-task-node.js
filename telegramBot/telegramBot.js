const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();
const { BOT_TOKEN } = process.env;
const { addUserForBot } = require("../controllers");

const bot = new Telegraf(BOT_TOKEN);
console.log("Start Telegram Bot");

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
    }. Enter new user name with /name command.`
  );
  resetNewUser();
});

bot.command("name", (ctx) => {
  ctx.reply("Enter new user name!");
});

bot.command("age", (ctx) => {
  ctx.reply("Enter new user age!");
});

bot.command("email", (ctx) => {
  ctx.reply("Enter new user email!");
});

bot.command("sendNewUser", async (ctx) => {
  try {
    const user = await addUserForBot(newUser);
    if (!user) {
      ctx.reply("Error. Something went wrong.");
    }
    ctx.reply("New user successfully sent to the server.");
    await resetNewUser();
  } catch (error) {
    ctx.reply(`Error: 
    ${error.message}`);
  }
});

bot.on("text", async (ctx) => {
  if (newUser.name === null) {
    ctx.reply(
      `The name of the new user is - "${ctx.message.text}". 
Now enter the age of the new user through the /age command. If you make a mistake, start over with the /start command.`
    );
    changeDataNewUser("name", ctx.message.text);
    return;
  }

  if (newUser.age === null) {
    const age = Number.parseInt(ctx.message.text);
    if (age > 0) {
      ctx.reply(
        `Successfully. The age of the new user is ${age} years. 
Now enter the new user's email via the /email command. If you make a mistake, start over with the /start command.`
      );
      changeDataNewUser("age", age);
    } else
      ctx.reply("Error. Age must be greater than zero years. Try again with the /age command.");
    return;
  }

  if (newUser.email === null) {
    const email = ctx.message.text;
    if (validateEmail(email)) {
      changeDataNewUser("email", email);
      ctx.reply(
        `Successfully. New user created. 
        Name: ${newUser.name}, 
        Age: ${newUser.age}, 
        Email: ${newUser.email}. 
        Check all data. If you make a mistake, start over with the /start command.
        Click /sendNewUser to send a new user to the server.`
      );
    } else {
      ctx.reply(`Error. ${email} - entered incorrectly. Try again using the /email command.`);
    }
    return;
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = bot;
