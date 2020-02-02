const mongoose = require('mongoose');
const { Schema } = mongoose;

const TurnsSchema = new Schema({
    gameId: String,
    actions: [{
        id: String, // maybe
        quote: String,
        comments: [String]
    }],
    mainText: String
});

mongoose.model('Turns', TurnsSchema);