const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clockedin')
		.setDescription('View all currently on-duty staff members'),
	execute: async (interaction, client) => {
		return;
	},
};

