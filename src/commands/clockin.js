const { ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder } = require('discord.js');
const axios = require("axios");
const helpers = require("../helpers.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clockin')
		.setDescription('Start a moderation shift'),
	execute: async (interaction, client) => {
		return;
	},
};

