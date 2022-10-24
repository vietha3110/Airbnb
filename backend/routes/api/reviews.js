const express = require('express');

const { setTokenCookie, requireAuth, requireAuthor } = require('../../utils/auth.js');
const { User, Spot, Review, SpotImage,ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require('sequelize'); 
const { route } = require('./session.js');
const spotimage = require('../../db/models/spotimage.js');

const router = express.Router();

//Get all Reviews of Current User

router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id;
    const reviews = await Review.findOne({
        where: {
            userId: id
        },
        include: [
            {
                model: User,
                attribute: {
                    include: ['id', 'firstName', 'lastName']
                }
            },
            {
                model: Spot,
                attribute: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage
            }
        ]
    });
    res.json(reviews);
})






















module.exports = router;
