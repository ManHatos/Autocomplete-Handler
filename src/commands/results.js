const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('results')
		.setDescription('Reset applications submissions and generate a results template')
		.setDMPermission(false),
	execute: async (interaction, client) => {
		return;
	},
};

