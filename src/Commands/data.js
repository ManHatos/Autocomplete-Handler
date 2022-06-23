const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('data')
		.setDescription('View your total moderation time')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('View a staff member\' total moderation time')
				.setRequired(false)
		),
	execute: async (interaction, client) => {
		return;
	},
};
