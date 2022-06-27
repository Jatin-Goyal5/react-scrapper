const express = require('express')
const router = express.Router();
const get = require('./get');

router.get('/', get.getBlogs);
router.get('/suggestedTags', get.getSuggestedTags)
module.exports =router;