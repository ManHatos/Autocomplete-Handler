const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("records")
    .setDescription("Search a player's active records")
    .setDMPermission(false)
    .addStringOption((option) =>
      option.setName("user").setDescription("The Roblox username of the player").setRequired(true).setAutocomplete(true)
    ),
  execute: async (interaction, client) => {
    return;
  },
};
