const {
    SlashCommandBuilder
} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("log")
        .setDescription("log a moderation action")
        .addStringOption(option =>
            option.setName('user')
            .setDescription('The Roblox username of the violator')
            .setRequired(true)
            .setAutocomplete(true)),
    execute: async (interaction, client) => {
        client.on('interactionCreate', async interaction => {
            if (!interaction.isAutocomplete()) return;
            const focusedOption = interaction.options.getFocused(true);
            let choices;

            if (focusedOption.name === 'user') {
                choices = ['faq', 'install', 'collection', 'promise', 'debug'];
            }

            const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
            await interaction.respond(
                filtered.map(choice => ({
                    name: choice,
                    value: choice
                })),
            );
        });

    },
};
