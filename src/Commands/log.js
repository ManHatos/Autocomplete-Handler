const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('././helpers.js');

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
				.addChoices(
					{
						name: 'Ban',
						value: 'Ban',
					},
					{
						name: 'Kick',
						value: 'Kick',
					},
					{
						name: 'Warning 2',
						value: 'W2',
					},
					{
						name: 'Warning 1',
						value: 'W1',
					},
					{
						name: 'Verbal Warning',
						value: 'VW',
					}
				)
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

