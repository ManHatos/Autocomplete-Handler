const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('export')
		.setDescription('Export all total moderation times')
		.addRoleOption((option) => 
			option
				.setName('filter')
				.setDescription('Export all total moderation times for a role')
				.setRequired(false)
		),
	execute: async (interaction, client) => {
		return;
	},
};
