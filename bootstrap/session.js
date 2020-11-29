const session = require('express-session');

module.exports = (app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET_KEY,
        saveUninitialized: true,
        resave: true,
        cookie: {
            secure: false,
            maxAge: 864000000 // 10 Days in milliseconds
        }
    }));
}
