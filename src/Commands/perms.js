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
				.setDescription('The violations of the violator')
				.setRequired(true))
		.addStringOption((option) =>
			option
				.setName('users')
				.setDescription('The Roblox usernames of the players')
				.setRequired(true)),
	execute: async (interaction, client) => {
return;
	},
};

