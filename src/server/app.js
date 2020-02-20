const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app


//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'think-and-discuss', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
    app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb://localhost/think-and-discuss', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('debug', true);

//Models & routes
require('./models/Users');
require('./models/game/Games');
require('./models/game/Turn');
require('./config/passport');
app.use(require('./routes'));

//Error handlers & middlewares
// if (!isProduction) {
//     app.use((err, req, res) => {

//         req.status(err.status || 500);

//         res.json({
//             errors: {
//                 message: err.message,
//                 error: err,
//             },
//         });
//     });
// }

// app.use((err, req, res) => {
//     res.status(err.status || 500);
//     console.log(res);
//     res.json({
//         errors: {
//             message: err.message,
//             error: {},
//         },
//     });
// });
// "bug": "node ./node_modules/nodemon/bin/nodemon.js"
server.listen(8000, () => console.log('Server running on http://localhost:8000/'));
// server.listen(8012);

io.on('connection', function(socket) {

    socket.on('connection', function(qwe) {
        console.log('Socket connection established');
    });

    socket.on('private message', function(from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('news', function(data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });


    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
});