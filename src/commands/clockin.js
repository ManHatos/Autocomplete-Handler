const { ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder().setName("clockin").setDescription("Start a moderation shift").setDMPermission(false),
  execute: async (interaction, client) => {
    return;
  },
};
