const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('records')
		.setDescription("Search a player's active records")
		.addStringOption((option) =>
			option
				.setName('user')
				.setDescription('The Roblox username of the player')
				.setRequired(true)
				.setAutocomplete(true)
		),
	execute: async (interaction, client) => {
		return;
	},
};

