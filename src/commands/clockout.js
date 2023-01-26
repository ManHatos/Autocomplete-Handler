const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  SlashCommandBuilder,
  ModalSubmitFields,
} = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder().setName("clockout").setDescription("End a moderation shift").setDMPermission(false),
  execute: async (interaction, client) => {
    return;
  },
};
