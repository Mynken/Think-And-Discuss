const mongoose = require('mongoose');
const { Schema } = mongoose;

const GamesSchema = new Schema({
    playersQuantity: Number,
    name: String
});

mongoose.model('Games', GamesSchema);