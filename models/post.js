const mongoose = require('mongoose');
const PostConn = require('../connections/postConn');
const tagsValidator = (val) => {
	return Array.isArray(val) && val.every((v) => typeof v === 'string');
};

const postSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, '貼文姓名必填'],
			cast: false,
		},
		tags: {
			type: [String],
			validate: [tagsValidator, 'tags is not a valid'],
			default: [],
		},
		type: {
			type: String,
			cast: false,
			default: null,
		},
		image: {
			type: String,
			cast: false,
			default: null,
		},
		content: {
			type: String,
			required: [true, '貼文內容必填'],
			cast: false,
		},
		likes: {
			type: Number,
			cast: false,
			default: 0,
		},
		comments: {
			type: Number,
			cast: false,
			default: 0,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);
const Post = PostConn.model('Posts', postSchema);

module.exports = Post;
