const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log")
    .setDescription("log a moderation action")
    .addStringOption(option => 
                     option.setName('user')
                     .setDescription('The Roblox username of the violator')
                     .setRequired(true)),
  execute: async (interaction, client) => {
    return interaction.reply({ content: 'Hi' });
  },
};
