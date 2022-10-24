const express = require('express');

const { setTokenCookie, requireAuth, requireAuthor } = require('../../utils/auth.js');
const { User, Spot, Review, SpotImage,ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require('sequelize'); 
const { route } = require('./session.js');
const spotimage = require('../../db/models/spotimage.js');
const { Op } = require('sequelize');

const router = express.Router();

//Get all Reviews of Current User

router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id;
    const reviews = await Review.findAll({
        where: {
            userId: id
        },
        raw: true
    });
    for (let review of reviews) {
        const user = await User.findOne({
            where: {
                id
            }, 
            attributes: {
                        exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']
                    }

        });
        review.User = user;
        const spots = await Spot.findAll({
            where: {
                ownerId: id
            },
            raw: true
        });
        for (let spot of spots) {
            const spotImages = await SpotImage.findAll({
                where: {
                    [Op.and]: [
                        {
                            spotId: spot.id,
                        },
                        {
                            preview: true
                        }
                    ]
                },
                attributes: {
                    exclude: ['id', 'preview']
                },
                raw: true
            });
            if (!spotImages.length) {
                spot.previewImage = null
            } else {
                spot.previewImage = spotImages[0]['url'];
            }
        }
        review.Spot = spots;
        const images = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: {
                exclude: ['reviewId', 'createdAt', 'updatedAt']
            },
            raw: true
        });
        review.ReviewImages = images
    }
    res.json(reviews);
});

//get all reviews by a spot id 

    
    























module.exports = router;
