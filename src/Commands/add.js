const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add a member to a ticket')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('The member to add')
				.setRequired(true)
		),
	execute: async (interaction, client) => {
		return;
	},
};
