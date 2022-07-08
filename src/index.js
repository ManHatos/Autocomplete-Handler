const { REST } = require('@discordjs/rest'); // Define REST.
const { Routes } = require('discord-api-types/v9'); // Define Routes.
const fs = require('fs'); // Define fs (file system).
const axios = require('axios'); // Requite axios (http).
const helpers = require('./helpers.js'); // Require helpers.
const { Client, Intents, Collection } = require('discord.js'); // Define Client, Intents, and Collection.
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}); // Connect to our discord bot.
const commands = new Collection(); // Where the bot (slash) commands will be stored.
const commandarray = []; // Array to store commands for sending to the REST API.
const token = process.env.DISCORD_TOKEN; // Token from Railway Env Variable.
// Execute code when the "ready" client event is triggered.
client.once('ready', () => {
	const commandFiles = fs.readdirSync('src/Commands').filter((file) => file.endsWith('.js')); // Get and filter all the files in the "Commands" Folder.

	// Loop through the command files
	for (const file of commandFiles) {
		const command = require(`./Commands/${file}`); // Get and define the command file.
		commands.set(command.data.name, command); // Set the command name and file for handler to use.
		commandarray.push(command.data.toJSON()); // Push the command data to an array (for sending to the API).
	}

	const rest = new REST({ version: '9' }).setToken(token); // Define "rest" for use in registering commands
	// Register slash commands.
	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');

			await rest.put(Routes.applicationCommands(client.user.id), {
				body: commandarray,
			});

			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();
	console.log(`Logged in as ${client.user.tag}!`);
});
// Interactions handler.
client.on('interactionCreate', async (interaction) => {
	if (interaction.isCommand()) {
		const command = commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			return await interaction.reply({
				content: '<:FSRP_Warned:961733338329129000> **A critical error has occured.**',
				ephemeral: true,
			});
		}
		console.log(`${interaction.user.tag} (#${interaction.user.id}) executed /${interaction.commandName}`);
	} else if (interaction.isAutocomplete()) {
		const focusedOption = interaction.options.getFocused(true);
		if (!focusedOption.name == 'user') return;
		if (!focusedOption.value || focusedOption.value.split('').length < 3)
			return await interaction.respond([]).catch(function (error) {
				console.log(error);
			});

		console.log(
			`${interaction.user.tag} (#${interaction.user.id}) is using '${focusedOption.name}' Autocomplete on /${interaction.commandName}:   ${focusedOption.value}`
		);
		let users = [];
		let response = await axios
			.get(`https://users.roblox.com/v1/users/search?keyword=${focusedOption.value}`)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('Error', error.message);
				}
			});
		response?.data?.data?.map((match) => {
			users.push({
				name: `${match.displayName.replace(/(?<=.{45})[\s\S]+/, '...')} (@${match.name.replace(
					/(?<=.{40})[\s\S]+/,
					'...'
				)})`,
				value: match.id.toString(),
			});
		});
		await interaction.respond(users).catch(function (error) {
			console.log(error);
		});
	}
	process.on('uncaughtException', function (error) {
		console.error(error);
	});
});

client.login(token); // Login to the bot client.
