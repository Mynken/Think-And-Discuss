const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Games = mongoose.model('Games');
const Turn = mongoose.model('Turn');

router.post('/create', auth.required, (req, res) => {
    const { body: { gameInfo } } = req;
    const finalgameInfo = new Games(gameInfo);

    return finalgameInfo.save()
        .then(() => res.json({ gameId: finalgameInfo.id }));
});

router.post('/saveTurn', auth.required, (req, res) => {
    const { body: { newTurn } } = req;
    const dbTurn = new Turn(newTurn);


    console.log(newTurn, dbTurn);
    return dbTurn.save()
        .then(() => res.json({ turnId: dbTurn.id }));
});


module.exports = router;