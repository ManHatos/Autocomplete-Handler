const { ApplicationCommandType, ApplicationCommandOptionType, Interaction } = require("discord.js");
const axios = require("axios");

module.exports = {
	name: "user",
	execute: async (interaction, client) => {
		const focusedOption = interaction.options.getFocused(true);
		let user = focusedOption.value;

		if (!user || user.length < 3)
			return await interaction.respond([]).catch(async (err) => {
				console.error(err);
			});
		user = user.match(/[\s\S]+ \(@[\s\S]+\)/) ? user.match(/(?=[^]+?[^_]+)\w{3,20}(?=\))/)[0] || user : user;

		const users = new Array();
		await axios
			.get(`https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(user)}`)
			.catch((err) => {
				if (err.response) {
					console.error("Roblox Search API Error", err.response.data);
					console.error(err.response.status);
				} else {
					console.error("Roblox Search API Error", err.message);
				}
			})
			.then((res) => {
				res?.data?.data?.map((map) => {
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
				.catch((err) => {
					if (err.response) {
						console.error("Roblox Specific Search API Error", err.response.data);
						console.error(err.response.status);
					} else {
						console.error("Roblox Specific Search API Error", err.message);
					}
				})
				.then((res) => {
					res?.data?.data?.map((map) => {
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
