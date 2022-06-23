const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clockout')
		.setDescription('End a moderation shift')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('Force end a moderation shift')
				.setRequired(false)
		),
	execute: async (interaction, client) => {
		return;
	},
};

