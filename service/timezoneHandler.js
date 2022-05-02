const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
const timezoneHandler = {
	taipei: (data) => {
		if (!data) return data;
		if (Array.isArray(data)) {
			return data.map((i) => ({
				...i._doc,
				createdAt: dayjs(i.createdAt).tz('Asia/Taipei').format(),
				updatedAt: dayjs(i.updatedAt).tz('Asia/Taipei').format(),
			}));
		}
		return {
			...data._doc,
			createdAt: dayjs(data.createdAt).tz('Asia/Taipei').format(),
			updatedAt: dayjs(data.updatedAt).tz('Asia/Taipei').format(),
		};
	},
};

module.exports = timezoneHandler;
