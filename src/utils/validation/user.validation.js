const { check } = require("express-validator");
const user_model = require("../../models/user.model");

exports.signup_validation = [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").not().isEmpty().isEmail().withMessage('enter valid email')
    .custom(async (value) => {
        const isExists = await user_model.find({ email: value });
        if (isExists.length > 0) {
            throw new Error('A user already exists with this email address');
        }
    }),
    check("password", "password is required").not().isEmpty().isLength({min: 6}).withMessage('Password Length must be at least 6 characters'),
];

exports.login_validation = [
    check("email", "email is required").not().isEmpty().isEmail().withMessage('enter valid email')
    .custom(async (value) => {
        const isExists = await user_model.find({ email: value });
        if (isExists.length == 0) {
            throw new Error('user not found with email ' + value);
        }
    }),
    check("password", "password is required").not().isEmpty().isLength({min: 6}).withMessage('Password Length must be at least 6 characters'),
];
