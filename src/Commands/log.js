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
    const users = [];
    const response = await axios.get(
      `https://users.roblox.com/v1/users/search?keyword=${interaction.options.data[0].value}&limit=10`
    );
    console.log(response.data);
    response.data.map(match => {
      users.push(match.displayName + '(' + '@' + match.name + ')');
    });
    interaction.reply({
      content: interaction.options.data[0].value + '\n' + users.join(', '),
      ephemeral: true,
    });
  },
};
