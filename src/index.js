const { REST } = require("@discordjs/rest");
const fs = require("fs");
const axios = require("axios");
const helpers = require("./helpers.js");
const { Client, GatewayIntentBits, Partials, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
const commands = [];
const map = new Map();
const token = process.env.DISCORD_TOKEN;

client.once("ready", () => {
  const commandFiles = fs.readdirSync("src/commands").filter((file) => file.endsWith(".js"));
  const autocompleteFiles = fs.readdirSync("src/autocomplete").filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    map.set(command.data.name + ' slash', command);
    commands.push(command.data.toJSON());
  }

  for (const file of autocompleteFiles) {
    const option = require(`./autocomplete/${file}`);
    map.set(option.name + ' autocomplete', option);
  }

  const rest = new REST({ version: '10' }).setToken(token);
  (async () => {
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.type === 2) {
    const command = map.get(interaction.commandName + ' slash');
    if (!command) return;

    try {
      // await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      return await interaction.reply({
        content: "<:FSRP_Warned:961733338329129000> **An unexpected error has occured while trying to execute this command.**\n**Please forward this message to `ManHat#2824`.**\n\n\n```js\n" + error.toJSON() + "```",
        ephemeral: true,
      });
    }
    console.log(`${interaction.user.tag} (#${interaction.user.id}) executed /${interaction.commandName}`);
  } else if (interaction.type === 4) {
    const option = map.get(interaction.options.getFocused(true).name + ' autocomplete');
    if (!option) return;

    try {
      await option.execute(interaction, client);
    } catch (error) {
      console.error(error);
    }
    console.log(
      `${interaction.user.tag} (#${interaction.user.id}) is using '${interaction.options.getFocused(true).name}' Autocomplete on /${interaction.commandName}:   ${interaction.options.getFocused(true).value}`
    );
  }
  process.on("uncaughtException", async (error) => {
    console.error(error);
  });
});

client.login(token);