const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('log')
		.setDescription('log a moderation action')
		.addStringOption((option) =>
			option
				.setName('user')
				.setDescription('The Roblox username of the violator')
				.setRequired(true)
				.setAutocomplete(true)
		)
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('The violations of the violator')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('action')
				.setDescription('The action taken on the violator')
				.setRequired(true)
				.addChoices(['Ban','Ban']),
		),
	execute: async (interaction, client) => {
		let user = await helpers.user(interaction.options.data[0].value);
		console.log(user);
		interaction.reply({
			content: 'Success',
			ephemeral: true,
		});
	},
};

