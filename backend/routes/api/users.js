const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your first name.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your last name.'),
    handleValidationErrors
];

//sign up

router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { username, password, email, firstName, lastName } = req.body;
        const user = await User.signup({
            username,
            password,
            email,
            firstName,
            lastName
        });
        await setTokenCookie(res, user);
        const userData = user.toJSON(); 
        userData.token = "";
        return res.json({
            ...userData
        });
    }
);



module.exports = router;
