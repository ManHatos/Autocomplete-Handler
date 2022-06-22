const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const helpers = require('../helpers.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('log')
		.setDescription('log a moderation action')
		.addStringOption((option) =>
			option
				.setName('user')
				.setDescription('The Roblox username of the violator')
				.setRequired(true)
				.setAutocomplete(true)
		)
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('The violations of the violator')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('action')
				.setDescription('The action taken on the violator')
				.setRequired(true)
				.addChoices(
					{ name: 'Ban', value: 'gif_funny' },
					{ name: 'Kick', value: 'gif_meme' },
					{ name: 'Warning 2', value: 'gif_movie' },
					{ name: 'Warning 1', value: 'W1' },
					{ name: 'Verbal Warning', value: 'VW' }
				)
		),
	execute: async (interaction, client) => {
		let user = await helpers.user(interaction.options.data[0].value);
		let channel = client.channels.cache.get('911388101543337994');
		await channe.send({
			embeds: [
				{
					title: '**Moderation Log**\n ‎‎',
					description: `\`Moderator: \`<@${mod.id}>\n\`ID: ${mod.id}\`\n\`\`\`U: ${user.data.name}\nR: ${reason}\nA: ${action}\`\`\``,
					color: 3092790,
					author: {
						name: `${mod.username}#${mod.discriminator}`,
						icon_url: `https://cdn.discordapp.com/avatars/${mod.id}/${mod.avatar}.png?size=256`,
					},
					image: {
						url: 'https://cdn.discordapp.com/attachments/821290011763671048/981153414069256192/750x1-00000000.png',
					},
					thumbnail: {
						url: user.data.avatar,
						height: 0,
						width: 0,
					},
					footer: {
						text: 'Logged at',
					},
					timestamp: new Date().toISOString(),
				},
			],
			components: [
				{
					type: 1,
					components: [
						{
							custom_id: `manage`,
							placeholder: `Manage log`,
							options: [
								{
									label: `Username`,
									value: `user`,
									description: `Edit the username field`,
									emoji: {
										name: 'Username',
										id: '944280695730208798',
									},
									default: false,
								},
								{
									label: `Reason`,
									value: `reason`,
									description: `Edit the reason field`,
									emoji: {
										name: 'mark',
										id: '984541778868830249',
									},
									default: false,
								},
								{
									label: `Action`,
									value: `action`,
									description: `Edit the action field`,
									emoji: {
										name: 'Action',
										id: '956660421660663808',
									},
									default: false,
								},
								{
									label: `Delete`,
									value: `delete`,
									description: `Delete the log`,
									emoji: {
										name: 'delete',
										id: '984539543392890930',
									},
									default: false,
								},
							],
							min_values: 1,
							max_values: 1,
							type: 3,
						},
					],
				},
			],
		});
		await interaction.reply({
			content: '**<:Information:956702498809327656> Successfully logged**',
			ephemeral: true,
		});
	},
};

