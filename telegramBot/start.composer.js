const { Composer } = require("telegraf");
const composer = new Composer();
const { addUserForBot } = require("../controllers");

composer.start((ctx) => {
  ctx.reply(`Welcome, ${ctx.from.first_name ? ctx.from.first_name : "Unknown"}.`);
  ctx.scene.enter("newUserScene");
});

composer.command("sendNewUser", async (ctx) => {
  try {
    const user = await addUserForBot(ctx.newUser);
    if (!user) {
      ctx.reply("Error. Something went wrong.");
    }
    ctx.reply("New user successfully sent to the server.");
  } catch (error) {
    ctx.reply(`Error:
    ${error.message}`);
  }
});

module.exports = composer;
