const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');

const myFormat = printf(({ timestamp, message }) => {
    return `${timestamp} ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({
            filename: path.join(__dirname, '/../logs/errors.log'),
            level: 'error'
        })
    ]
});

const log = (error) => {
    const regEx = new RegExp(`${process.cwd()}\\/(?!node_modules\\/)([\\/\\w-_\\.]+\\.js):(\\d*):(\\d*)`)
    const results = error.stack.match(regEx);
    if (results) {
        const [, filename, line, column] = results;
        logger.error(error + ' @ ' + filename + ' in ' + line + ':' + column);
    }
}


module.exports = log;