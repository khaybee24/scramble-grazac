const express = require('express');
const { addWord, getWords } = require('../controller/wordController');
const router = express.Router();


// Import controllers
router.post('/postwords', addWord);
router.get('/fetchwords', getWords);

module.exports = router;