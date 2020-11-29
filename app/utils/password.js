'use strict';

const bcrypt = require("bcrypt");

const generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const passwordMatch = async (password1, password2) => {
    return await bcrypt.compare(password1, password2);
}

module.exports = {
    generatePassword,
    passwordMatch
}