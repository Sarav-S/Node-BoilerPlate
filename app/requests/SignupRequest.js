const BaseRequest = require('./BaseRequest');

class SignupRequest extends BaseRequest {
    rules(req) {
        return {
            name: "required|string",
            email: "required|email",
            password: "required|min:8|max:20|confirmed"
        }
    }
}

module.exports = new SignupRequest;