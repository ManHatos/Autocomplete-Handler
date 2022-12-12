const { ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const helpers = require("../helpers.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bolo")
    .setDescription("Put out a ban bolo on a player")
    .setDMPermission(false)
    .addStringOption((option) =>
      option.setName("user").setDescription("The Roblox username of the player").setRequired(true).setAutocomplete(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The violations of the player").setRequired(true)
    ),
  execute: async (interaction, client) => {
    return;
  },
};
