const { ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder } = require('discord.js');
const axios = require("axios");
const helpers = require("../helpers.js");
const db = require('./src/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("this is only a test"),
    execute: async (interaction, client) => {
        const e = await db.test('SELECT * FROM users');
        return interaction.reply(e?.rows?.toJSON());
    },
};
