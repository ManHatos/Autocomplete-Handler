const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("export")
    .setDescription("Export all total moderation times")
    .setDMPermission(false)
    .addRoleOption((option) =>
      option.setName("filter").setDescription("Export all total moderation times for a role").setRequired(false)
    ),
  execute: async (interaction, client) => {
    return;
  },
};
