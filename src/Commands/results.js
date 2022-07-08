const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('results')
		.setDescription('Reset applications submissions and generate a results template'),
	execute: async (interaction, client) => {
		return;
	},
};

