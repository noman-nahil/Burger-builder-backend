const jwt = require('jsonwebtoken');
const joi = require('joi');
const { Schema, model } = require('mongoose');

const userSchema = schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60
    })
    return token;
}

const validator = user => {
    const schema = joi.object({
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    });
    return schema.validate(user)
}
module.exports.User = model('User', userSchema);
module.exports.validate = validator;