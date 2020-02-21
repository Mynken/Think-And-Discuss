const mongoose = require('mongoose');
const { Schema } = mongoose;

const GamesSchema = new Schema({
    playersQuantity: Number,
    name: String,
    status: Number
});

mongoose.model('Games', GamesSchema);