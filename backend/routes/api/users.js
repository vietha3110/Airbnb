const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const router = express.Router();
//sign up

router.post(
    '/',
    async (req, res) => {
        const { username, password, email } = req.body;
        const user = await User.signup({
            username,
            password,
            email
        });
        await setTokenCookie(res, user);

        return res.json({
            user
        });
    }
);



module.exports = router;
