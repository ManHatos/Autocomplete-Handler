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
				.setMinLength(3)
				.setMaxLength(50)
		)
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('The violations of the violator')
				.setRequired(true)
				.setMinLength(1)
				.setMaxLength(2000)
		)
		.addStringOption((option) =>
			option
				.setName('action')
				.setDescription('The action taken on the violator')
				.setRequired(true)
				.addChoices(
					{ name: 'Ban', value: 'Ban' },
					{ name: 'Kick', value: 'Kick' },
					{ name: 'Warning 2', value: 'W2' },
					{ name: 'Warning 1', value: 'W1' },
					{ name: 'Verbal Warning', value: 'VW' }
				)
		),
	execute: async (interaction, client) => {
		return;
	},
};
