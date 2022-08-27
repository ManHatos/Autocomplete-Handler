const { ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder } = require('discord.js');
const axios = require("axios");
const helpers = require("../helpers.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("name")
    .setDescription("My cool command does this!"),
  execute: async (interaction, client) => {
    return interaction.reply("Hey! you used my command!");
  },
};
