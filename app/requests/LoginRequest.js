const BaseRequest = require('./BaseRequest'),
    middleware = require('composable-middleware');

class LoginRequest extends BaseRequest {
    model() {
        return "User";
    }

    existsRule(req) {
        return { email: req.body.email }
    }

    rules(req) {
        return {
            email: "required|email",
            password: "required|min:8|max:20"
        }
    }

    validate() {
        return middleware()
            .use(super.validate())
            .use(super.exists())
    }
}

module.exports = new LoginRequest;