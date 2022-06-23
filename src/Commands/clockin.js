const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clockin')
		.setDescription('Start a moderation shift')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('Force start a moderation shift')
				.setRequired(false)
		),
	execute: async (interaction, client) => {
		return;
	},
};

