const { ApplicationCommandType, ApplicationCommandOptionType, Interaction } = require("discord.js");
const axios = require("axios");
const helpers = require("../helpers.js");

module.exports = {
  name: "user",
  execute: async (interaction, client) => {
    const focusedOption = interaction.options.getFocused(true);

    let user = null;
    if (!focusedOption.name == "user") return;
    if (!focusedOption.value || focusedOption.value.split("").length < 3)
      return await interaction.respond([]).catch(async (error) => {
        console.log(error);
      });
    if (focusedOption.value.match(/[\s\S]+ \(@[\s\S]+\)/)) {
      user = focusedOption.value.match(/(?=[^]+?[^_]+)\w{3,20}(?=\))/)[0];
    }
    if (!user) user = focusedOption.value;

    let users = [];
    let response = await axios.get(`https://users.roblox.com/v1/users/search?keyword=${user}`).catch(function (error) {
      if (error.response) {
        console.error("Roblox Search API Error", error.response.data);
        console.error(error.response.status);
      } else {
        console.error("Roblox Search API Error", error.message);
      }
    });
    response?.data?.data?.map((match) => {
      users.push({
        name: `${match.displayName.replace(/(?<=.{35})[\s\S]+/, "...")} (@${match.name.replace(
          /(?<=.{55})[\s\S]+/,
          "..."
        )})`,
        value: match.id.toString(),
      });
    });
    await interaction.respond(users).catch(async (error) => {
      console.log(error);
    });
  },
};
