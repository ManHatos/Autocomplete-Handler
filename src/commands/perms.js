const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('perms')
		.setDescription('Save permissions given to players')
		.addStringOption((option) =>
			option
				.setName('type')
				.setDescription('The type of the permissions given')
				.setRequired(true)
				.addChoices(
					{ name: 'Bank Robbery', value: 'Bank Robbery Permissions' },
					{ name: 'Road Work', value: 'Road Work Permissions' }
				)
		)
		.addStringOption((option) =>
			option
				.setName('users')
				.setDescription('The Roblox usernames of the players, seperated by commas (,)')
				.setRequired(true)
		),
	execute: async (interaction, client) => {
		return;
	},
};

