const { ApplicationCommandType, ApplicationCommandOptionType, Interaction } = require("discord.js");
const axios = require("axios");
const helpers = require("../helpers.js");

module.exports = {
	name: "user",
	execute: async (interaction, client) => {
		const focusedOption = interaction.options.getFocused(true);
		let user = focusedOption.value;

		if (!user || user.length < 3)
			return await interaction.respond([]).catch(async (error) => {
				console.error(error);
			});
		user = user.match(/[\s\S]+ \(@[\s\S]+\)/) ? user.match(/(?=[^]+?[^_]+)\w{3,20}(?=\))/)[0] || user : user;

		const users = new Array();
		await axios
			.get(`https://users.roblox.com/v1/users/search?keyword=${encodeURI(user)}`)
			.catch(function (error) {
				if (error.response) {
					console.error("Roblox Search API Error", error.response.data);
					console.error(error.response.status);
				} else {
					console.error("Roblox Search API Error", error.message);
				}
			})
			.then(function (response) {
				response?.data?.data?.map((map) => {
					users.push({
						name: `${map.displayName.replace(/(?<=.{35})[\s\S]+/, "...")} (@${map.name.replace(/(?<=.{55})[\s\S]+/, "...")})`,
						value: map.id.toString(),
					});
				});
			});
		if (!users[0]) {
			await axios
				.post(`https://users.roblox.com/v1/usernames/users`, {
					usernames: [user],
					excludeBannedUsers: true,
				})
				.catch(function (error) {
					if (error.response) {
						console.error("Roblox Specific Search API Error", error.response.data);
						console.error(error.response.status);
					} else {
						console.error("Roblox Specific Search API Error", error.message);
					}
				})
				.then(function (response) {
					response?.data?.data?.map((map) => {
						users.push({
							name: `${map.displayName.replace(/(?<=.{35})[\s\S]+/, "...")} (@${map.name.replace(/(?<=.{55})[\s\S]+/, "...")})`,
							value: map.id.toString(),
						});
					});
				});
		}
		await interaction.respond(users).catch(async (error) => {
			console.error(error);
		});
	},
};
