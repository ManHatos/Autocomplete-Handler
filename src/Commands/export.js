const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('export')
		.setDescription('Export all total moderation times')
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('Channel to send export in')
				.addChannelTypes('GuildText')
		),
	execute: async (interaction, client) => {
		return;
	},
};

