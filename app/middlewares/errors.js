const log = require('../../bootstrap/logger');

module.exports = (error, request, response, next) => {
    if (
        error.message == "Invalid authentication tag length: 0" ||
        error.message == "Invalid IV length" ||
        error.message == "Unsupported state or unable to authenticate data"
    ) {
        return response.failure({
            errors: { message: error.message }
        });
    }

    log(error);

    return response.error({ message: error.message });
}