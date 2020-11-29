const requireDir = require('require-dir');

class File {
    static init() {
        requireDir('./');
        return Promise.resolve('Success');
    }
}

module.exports = {
    File,
    AuthController: require('./AuthController')
}

