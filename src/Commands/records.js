const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('records')
		.setDescription('Search a player\' active records')
		.addStringOption((option) =>
			option
				.setName('user')
				.setDescription('The Roblox username of the player')
				.setRequired(true)
		),
	execute: async (interaction, client) => {
		return;
	},
};
