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
	const commandFiles = fs
		.readdirSync('src/Commands')
		.filter((file) => file.endsWith('.js')); // Get and filter all the files in the "Commands" Folder.

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
// Command handler.
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		return interaction.reply({
			content:
				'<:FSRP_Warned:961733338329129000> **A critical error has occured.**',
			ephemeral: true,
		});
	}
});
// Autocomplete handler.
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isAutocomplete()) return;

	const focusedOption = interaction.options.getFocused(true);
	if (!focusedOption.name == 'user') return;
	console.log(focusedOption.value.split(''));
	if (focusedOption.value.split('').length < 3) {
		await interaction
			.respond([
				{
					name: 'The username is too short',
					value: focusedOption.value,
				},
			])
			.then(console.log)
			.catch(console.error);
		return;
	}
	let users = [];
	try {
		const response = await axios.get(
			`https://users.roblox.com/v1/users/search?keyword=${focusedOption.value}&limit=10`
		);
		console.log(response.data);
		if (response.data.data) {
			response.data.data.map((match) => {
				users.push({
					name: match.displayName + ' (@' + match.name + ')',
					value: match.id.toString(),
				});
			});
			console.log('users', users);
			await interaction.respond(users).then(console.log).catch(console.error);
		} else {
			console.log('API error', response.data);
			await interaction
				.respond([
					{
						name:
							response.data.errors[0].message.replace('keyword', 'username') +
							' | #' +
							response.data.errors[0].code,
						value: focusedOption.value,
					},
				])
				.then(console.log)
				.catch(console.error);
		}
	} catch (error) {
		console.log('error', error);
	}
});

client.login(token); // Login to the bot client.

