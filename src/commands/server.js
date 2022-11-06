const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Announce a server startup, or shutdown')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('startup')
				.setDescription('Announce a server startup')
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('shutdown')
				.setDescription('Announce a server shutdown')
		),
	execute: async (interaction, client) => {
		return;
	},
};
