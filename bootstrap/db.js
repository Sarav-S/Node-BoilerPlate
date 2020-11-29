// Database connection
const mongoose = require('mongoose');

async function init() {
    let db = process.env.MONGODB_URL;
    switch (process.env.APP_ENV) {
        case 'test':
            db = process.env.MONGODB_URL_FOR_TESTS;
            break;
        default:
            break;
    }
    await mongoose.connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    return Promise.resolve(`Database connection established for ${process.env.APP_ENV} environment`);
}

module.exports = { init };
