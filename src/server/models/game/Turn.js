const mongoose = require('mongoose');
const { Schema } = mongoose;

const TurnSchema = new Schema({
    gameId: String,
    turn: Schema.Types.Mixed
});

mongoose.model('Turn', TurnSchema);