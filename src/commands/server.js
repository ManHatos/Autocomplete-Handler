const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Announce a server startup, or shutdown")
    .setDMPermission(false)
    .addSubcommand((subcommand) => subcommand.setName("startup").setDescription("Announce a server startup"))
    .addSubcommand((subcommand) => subcommand.setName("shutdown").setDescription("Announce a server shutdown")),
  execute: async (interaction, client) => {
    return;
  },
};
