const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('data')
		.setDescription('View your total moderation time')
		.setDMPermission(false)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('View another staff member\'s total moderation time')
				.setRequired(false)
		),
	execute: async (interaction, client) => {
		return;
	},
};
