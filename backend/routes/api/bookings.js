const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User, Booking, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

//get all of current user booking
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
        where: {
            userId
        },
        raw: true
    });

    for (let booking of bookings) {
        const spot = await Spot.findOne({
            where: {
                id: booking.spotId
            },
            raw: true
        });
        const spotImages = await SpotImage.findAll({
            where: {
                [Op.and]: [
                    {
                        spotId: booking.spotId,
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
        booking.Spot = spot;
    }
    res.json({
        "Bookings": bookings
    });
});

//edit booking 

// router.put('/:bookingId', requireAuth, requireAuthorBooking, async (req, res, next) => {

// });

// router.delete('/:bookingId', requireAuth, requireAuthorDeleteBooking, async (req, res, next) => {

// });


module.exports = router;
