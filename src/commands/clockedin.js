const { ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder } = require('discord.js');
const axios = require("axios");
const helpers = require("../helpers.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clockedin')
		.setDescription('View all currently on-duty staff members'),
	execute: async (interaction, client) => {
		return;
	},
};
