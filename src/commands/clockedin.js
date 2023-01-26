const { ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clockedin")
    .setDescription("View all currently on-duty staff members")
    .setDMPermission(false),
  execute: async (interaction, client) => {
    return;
  },
};
