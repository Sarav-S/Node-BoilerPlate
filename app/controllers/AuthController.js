'use strict';

const bcrypt = require("bcrypt");
const { User } = require('../models');
const { generatePassword, passwordMatch } = require('../utils/password');
const { sendResetPasswordLink } = require('../utils/email');

module.exports = class AuthController {

    /**
     * Registers the users
     * 
     * @param object req 
     * @param object res 
     * 
     * @return json
     */
    static async signup(req, res) {
        const data = req.body;
        data.password = await generatePassword(req.body.password);

        const user = await User.create(data);

        const result = user.jsonFields();
        result.token = user.generateAuthToken();

        return res.successWithHeaders(result);
    }

    /**
     * Returns the authenticated user's info
     * 
     * @param object req 
     * @param object res 
     * 
     * @return json
     */
    static async login(req, res) {
        const passwordMatch = await bcrypt.compare(req.body.password, req.user.password);
        if (!passwordMatch)
            return res.failure({ password: "Incorrect password." });

        const user = req.user.jsonFields();
        user.token = req.user.generateAuthToken();

        return res.successWithHeaders(user);
    }

    /**
     * Triggers password reset link
     * 
     * @param object req 
     * @param object res 
     * 
     * @return json
     */
    static async forgotPassword(req, res) {
        const crypto = require("crypto");
        const token = crypto.randomBytes(20).toString('hex');

        req.user.token = token;
        await req.user.save();

        sendResetPasswordLink({ email: req.user.email, token });

        return res.success();
    }

    /**
     * Updates the new password
     * 
     * @param object req 
     * @param object res 
     * 
     * @return json
     */
    static async resetPassword(req, res) {
        if (req.user.token !== req.body.token)
            return res.failure({ token: "Incorrect token supplied." });

        const salt = await bcrypt.genSalt(10);
        req.user.password = await bcrypt.hash(req.body.password, salt);

        /**
         * After user resets the password, we should make token as null
         * thus making the reset link sent as dead and invalid
         */
        req.user.token = null;
        await req.user.save();

        const data = req.user.jsonFields();
        data.token = req.user.generateAuthToken();

        return res.successWithHeaders(data);
    }
}