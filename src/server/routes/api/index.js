const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/game', require('./games'));

module.exports = router;