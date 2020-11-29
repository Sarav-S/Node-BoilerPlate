let model;
const Validator = require('validatorjs');

class BaseRequest {
    constructor() {
        if (typeof this.model === "function") {
            model = require(`../models/${this.model()}`);
        }
    }

    validate() {
        return async (req, res, next) => {
            if (typeof this.rules !== "function") {
                throw new Error("Validation rule not defined");
            }

            let inputs = req.body;
            if (typeof this.inputs === "function") {
                inputs = this.inputs();
            }

            const validation = new Validator(inputs, this.rules(req));
            if (validation.fails()) {
                const errors = {};
                for (let error in validation.errors.errors) {
                    errors[error] = validation.errors.errors[error][0];
                }

                return res.validationFailure(errors);
            }

            if (typeof this.afterValidation === "function") {
                this.afterValidation(req);
            }

            next();
        }
    }

    exists() {
        return async (req, res, next) => {
            if (typeof this.existsRule !== "function") {
                throw Error("Exists rule not defined");
            }

            if (typeof this.model !== "function") {
                throw Error("Model not defined");
            }

            const name = this.model();
            const record = await model.findOne(this.existsRule(req));
            if (!record)
                return res.notFound({ message: `${name} not found.` });

            req[name.toLowerCase()] = record;
            next();
        }
    }

    async validateOnStore() {

    }

    async validateOnUpdate() {

    }
}

module.exports = BaseRequest;