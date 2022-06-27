const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Reset applications and generate a results template'),
	execute: async (interaction, client) => {
		return;
	},
};

