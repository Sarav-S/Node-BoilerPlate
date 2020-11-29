const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = require("./../../database/schemas/users");

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    }, process.env.JWT_PRIVATE_KEY);
};

userSchema.methods.jsonFields = function jsonFields() {
    return {
        _id: this._id,
        name: this.name,
        email: this.email
    };
}

userSchema.statics.checkEmailAvailabilty = async (req) => {
    const user = await User.findOne({
        _id: {
            $ne: req.user._id
        },
        email: req.body.email
    });
    if (user) {
        throw new Error("Email already taken");
    }
}

userSchema.statics.findByEmail = async function findByEmail(email) {
    return await this.findOne({ email });
}

userSchema.statics.checkToken = async function checkToken(id) {
    let user = await this.findById(id);
    if (!user) {
        throw new Error;
    }

    return user;
}

module.exports = mongoose.model("User", userSchema);