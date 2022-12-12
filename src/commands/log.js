const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const helpers = require("../helpers.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log")
    .setDescription("log a moderation action")
    .setDMPermission(false)
    .addStringOption((option) =>
      option.setName("user").setDescription("The Roblox username of the player").setRequired(true).setAutocomplete(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The violations of the player").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("The action taken on the player")
        .setRequired(true)
        .addChoices(
          { name: "Ban", value: "Ban" },
          { name: "Kick", value: "Kick" },
          { name: "Warning 2", value: "W2" },
          { name: "Warning 1", value: "W1" },
          { name: "Verbal Warning", value: "VW" }
        )
    ),
  execute: async (interaction, client) => {
    return;
  },
};
