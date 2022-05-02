var express = require('express');
const CustomizeError = require('../exception/customizeError');
var router = express.Router();
var Post = require('../models/post');
const ErrorHandler = require('../service/errorHandler');
const timezoneHandler = require('../service/timezoneHandler');

router.get('/', async (req, res, next) => {
	const posts = await Post.find().then((doc) => timezoneHandler.taipei(doc));
	res.status('200').json(posts);
});

router.get('/:id', async (req, res, next) => {
	try {
		const post = await Post.findOne({ _id: req.params.id }).then((doc) =>
			timezoneHandler.taipei(doc),
		);
		res.status('200').json(post);
	} catch (error) {
		ErrorHandler({ res, error });
	}
});

router.post('/', async (req, res, next) => {
	try {
		const body = req.body;
		if (Array.isArray(body)) {
			throw new CustomizeError('資料不能是陣列');
		}
		if (body?.content?.trim().length === 0 ?? false) {
			throw new CustomizeError('content 不能為空白');
		}
		if (!body.content) {
			throw new CustomizeError('content 為必填');
		}
		const newPost = await Post.create(body).then((doc) =>
			timezoneHandler.taipei(doc),
		);
		res.status('201').json(newPost);
	} catch (error) {
		ErrorHandler({ res, error });
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		const body = req.body;
		if (Array.isArray(body)) {
			throw new CustomizeError('資料不能是陣列');
		}
		if (body?.content?.trim().length === 0 ?? false) {
			throw new CustomizeError('content 不能為空白');
		}
		if (!body.content) {
			throw new CustomizeError('content 為必填');
		}

		let post = await Post.findOne({ _id: req.params.id });
		if (!post) {
			throw new CustomizeError('查無此 ID 文章');
		}
		post = await Post.findOneAndUpdate({ _id: id }, body, {
			returnDocument: 'after',
		}).then((doc) => timezoneHandler.taipei(doc));
		res.status('200').json(post);
	} catch (error) {
		ErrorHandler({ res, error });
	}
});

router.delete('/', async (req, res, next) => {
	await Post.deleteMany();
	const posts = await Post.find().then((doc) => timezoneHandler.taipei(doc));
	res.status(200).json(posts);
});

router.delete('/:id', async (req, res, next) => {
	try {
		let post = await Post.findByIdAndDelete({ _id: req.params.id });
		if (!post) {
			throw new CustomizeError('查無此 ID 文章');
		}
		const posts = await Post.find().then((doc) => timezoneHandler.taipei(doc));
		res.status(200).json(posts);
	} catch (error) {
		ErrorHandler({ res, error });
	}
});

module.exports = router;
