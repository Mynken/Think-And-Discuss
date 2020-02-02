const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Games = mongoose.model('Games');

router.post('/create', auth.required, (req, res, next) => {
    const { body: { gameInfo } } = req;
    const finagameInfo = new Games(gameInfo);

    console.log(finagameInfo, gameInfo);
    return finagameInfo.save()
        .then(() => res.json({ gameId: finagameInfo.id }));
});


module.exports = router;