const { ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder, ModalSubmitFields } = require('discord.js');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clockout')
		.setDescription('End a moderation shift'),
	execute: async (interaction, client) => {
		return;
	},
};

