const { Scenes } = require("telegraf");

const validateEmail = function (email) {
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
};

const newUserScene = new Scenes.WizardScene(
  "newUserScene",

  (ctx) => {
    ctx.reply("Enter new user name.");
    return ctx.wizard.next();
  },

  async (ctx) => {
    const name = ctx.message.text;
    if (name !== "/start" && name !== "/sendnewuser") {
      ctx.newUser.name = name;
      ctx.reply(`Successfully. The name of the new user is - "${name}". Now enter new user age.`);
      return ctx.wizard.next();
    }
    ctx.reply("Invalid name. Try again.");
  },

  async (ctx) => {
    const age = Number.parseInt(ctx.message.text);
    if (age > 0) {
      ctx.reply(`Successfully. The age of the new user is ${age} years. Now enter new user email.`);
      ctx.newUser.age = age;
      return ctx.wizard.next();
    }
    ctx.reply("Error. Age must be greater than zero years. Try again.");
  },

  async (ctx) => {
    const email = ctx.message.text;
    if (validateEmail(email)) {
      ctx.newUser.email = email;
      ctx.reply(
        `Successfully. New user created:
        Name: ${ctx.newUser.name},
        Age: ${ctx.newUser.age},
        Email: ${ctx.newUser.email}.

        Check all data. If you make a mistake, start over with the /start command.
        Click /sendNewUser to send a new user to the server.`
      );
      return ctx.scene.leave();
    }
    ctx.reply(`Error. ${email} - entered incorrectly. Try again.`);
  }
);

module.exports = newUserScene;
