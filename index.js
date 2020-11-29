const express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    dotenv = require('dotenv').config();

if (dotenv.error) {
    console.trace('.env file is missing');
    process.exit(0);
}

require('express-async-errors');
require('./bootstrap/session')(app);
require('./bootstrap/routes')(app);

const db = require('./bootstrap/db');
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.enable('trust proxy');

app.use(cookieParser());
app.use(express.static('public'));

const port = process.env.PORT || 3000;

module.exports = db.init()
    .then(message => {
        const { File } = require('./app/models/index');
        return File.init();
    }).then(message => {
        const { File } = require('./app/controllers/index');
        return File.init();
    }).then(() => {
        console.log(`Connected to ${port} as ${process.env.APP_ENV} environment`);
        return app.listen(port);
    }).catch(e => {
        console.error(e);
        process.exit(0);
    });
