const express = require('express');
const { wordGuess, scramble } = require('../controller/gameController');

const router = express.Router();

router.get('/scramble', scramble);
router.post('/guess', wordGuess);

module.exports = router;