const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('log')
    .setDescription('log a moderation action')
    .addStringOption(option =>
      option
        .setName('user')
        .setDescription('The Roblox username of the violator')
        .setRequired(true)
        .setAutocomplete(true)
    ),
  execute: async (interaction, client) => {
    try {
      const response = await axios.get('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    interaction.reply({
      content: interaction.options.data[0].value,
      ephemeral: true,
    });
  },
};
