const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const helpers = require("../helpers.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("compare")
    .setDescription("Compares two total moderation time data files")
    .setDMPermission(false)
    .addAttachmentOption((option) =>
      option.setName("file").setDescription("The first file to compare").setRequired(true)
    )
    .addAttachmentOption((option) =>
      option.setName("file2").setDescription("The second file to compare").setRequired(true)
    ),
  execute: async (interaction, client) => {
    return;
  },
};
