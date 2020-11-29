const cors = require('cors'),
    error = require('../app/middlewares/errors'),
    response = require('../app/middlewares/response'),
    bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000000 }));
    app.use(bodyParser.json({ limit: '50mb' }));
    const frontendURL = process.env.FRONTEND_APP_URL;

    app.use(cors({
        origin: [frontendURL],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        exposedHeaders: 'x-auth-token',
        credentials: true // enable set cookie
    }));
    app.use(response);
    app.get('/', (req, res) => {
        res.success({
            message: "Welcome to ERP API Endpoint!"
        });
    });

    app.use(error);
}