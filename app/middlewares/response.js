module.exports = (req, res, next) => {
    const flag = {
        success: true,
        failure: false
    }

    res.success = (data) => {
        res.status(200).send({
            status: flag.success,
            data
        });
    };

    res.successWithHeaders = (item = {}) => {
        res.status(200)
            .header('x-auth-token', item.token)
            .send({
                status: flag.success,
                data: item
            });
    }

    res.created = (data) => {
        res.status(201).send({
            status: flag.success,
            data
        });
    };

    res.destroyed = () => {
        res.status(204).send({});
    };

    res.failure = (errors = {}) => {
        res.status(400).send({
            status: flag.failure,
            errors
        });
    };

    res.validationFailure = (errors = {}) => {
        res.status(422).send({
            status: flag.failure,
            errors
        });
    }

    res.unauthorized = (message = null) => {
        res.status(401).send({
            status: flag.success,
            errors: { message: message || "Access denied." },
        });
    };

    res.forbidden = (message = null) => {
        res.status(403).send({
            status: flag.success,
            errors: { message: message || "Permission denied." }
        });
    };

    res.notFound = (errors = {}) => {
        res.status(404).send({
            status: flag.failure,
            errors
        });
    };

    res.error = (errors = {}) => {
        const data = {
            status: flag.failure,
            errors
        };

        if (process.env.ERP_ENV !== "development") {
            delete data.errors;
        }

        res.status(500).send(data);
    };
    next();
}