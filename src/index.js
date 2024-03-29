const fs = require("node:fs");
const axios = require("axios");
const { Client, GatewayIntentBits, Partials, REST, Routes } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

const filesMap = new Map();
const commandsArray = new Array();

client.once("ready", () => {
	const commandFiles = fs.readdirSync("src/commands").filter((file) => file.endsWith(".js"));
	const autocompleteFiles = fs.readdirSync("src/autocomplete").filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		filesMap.set(`commands/${command.data.name}`, command);
		commandsArray.push(command.data.toJSON());
	}

	for (const file of autocompleteFiles) {
		const option = require(`./autocomplete/${file}`);
		filesMap.set(`autocomplete/${option.name}`, option);
	}

	const rest = new REST({ version: "10" }).setToken(process.env.token);
	(async () => {
		try {
			console.log("Refreshing application (/) commands");
			await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.guild), {
				body: commandsArray,
			});
			console.log("Successfully reloaded application (/) commands");
		} catch (error) {
			console.error(error);
		}
	})();
	console.log(`Logged in as ${client.user.tag}.`);
});

client.on("interactionCreate", async (interaction) => {
	if (interaction.type === 2 /* slash command (2) */) {
		const command = filesMap.get(`commands/${interaction.commandName}`);
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
	} else if (interaction.type === 4 /* autocomplete (4) */) {
		const focusedOption = interaction.options.getFocused(true);
		const option = filesMap.get(`autocomplete/${focusedOption.name}`);
		if (!option) return;

		try {
			await option.execute(interaction, client);
		} catch (error) {
			console.error(error);
		}
		console.log(`${interaction.user.tag} (#${interaction.user.id}) is using '${focusedOption.name}' Autocomplete on /${interaction.commandName}:   ${focusedOption.value}`);
	}
});

// process events
process.on("uncaughtException", (error) => {
	console.error(error);
});
process.on("warning", (warning) => {
	console.error(warning.stack);
});

client.login(process.env.token);
