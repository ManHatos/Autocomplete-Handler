const axios = require('axios'); // Require axios (http).

module.exports = {
	user: async function user(username) {
		try {
			let userid = username;
			if (!parseInt(username)) {
				userid = await axios.post(
					'https://users.roblox.com/v1/usernames/users',
					{
						usernames: [username],
						excludeBannedUsers: false,
					}
				);
				userid = userAPI.data.data[0].id;
			} else {
				let userAPI = await axios.get(
					`https://users.roblox.com/v1/users/${userid}`
				);
				userAPI.data.avatar =
					'https://cdn.discordapp.com/attachments/893226654086864966/968269659348562011/unknown.png';
				let avatarAPI = await axios.get(
					`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userid}&size=720x720&format=Png&isCircular=false`
				);
				if (avatarAPI.data.data[0]) {
					userAPI.data.avatar = avatarAPI.data.data[0].imageUrl;
				}
				userAPI.data.created = (
					new Date(userAPI.data.created).getTime() / 1000
				).toFixed(0);
				if (userAPI.data.description.split('').lenth <= 0) {
					userAPI.data.description = null;
				}
				return {
					state: true,
					data: userAPI.data,
				};
			}
		} catch (error) {
			return {
				state: false,
				error: 0,
			};
		}
	},
};

