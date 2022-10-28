const express = require('express');

const { setTokenCookie, requireAuth, requireAuthorCreateBooking, requireAuthorUpdateBooking, requireAuthorDeleteBooking } = require('../../utils/auth.js');
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
const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .isDate({checkFalsy: true})
        .withMessage('Start Date is required'),
    check('endDate')
        .exists({ checkFalsy: true })
        .isDate({checkFalsy: true})
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

router.put('/:bookingId', requireAuth, requireAuthorUpdateBooking, async (req, res, next) => {
    const bookingId = req.params.bookingId; 
    const updateBooking = await Booking.findByPk(bookingId);
    const spotId = updateBooking.spotId;
    let { startDate, endDate } = req.body;
    let today = new Date();
    let startDateValue = new Date(startDate);
    let endDateValue = new Date(endDate)
    
    if (endDateValue.getTime() <= startDateValue.getTime()) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        });
    }

    if ( endDateValue.getTime() <= today.getTime()) {
        return res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        });
    }

    const bookings = await Booking.findAll({
        where: {
            spotId
        },
        raw: true
    });
    
    for (let booking of bookings) {
        let startValue = new Date(booking.startDate);
        let endValue = new Date(booking.endDate);
        if (booking.id !== bookingId) {
            if (!(endDateValue.getTime() <= startValue.getTime() || startDateValue.getTime() >= endValue.getTime())) {
                return res.status(403).json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": 403,
                    "errors": {
                        "startDate": "Start date conflicts with an existing booking",
                        "endDate": "End date conflicts with an existing booking"
                    }
                });
            }
        }
    }

    if (startDate) {
        updateBooking.startDate = startDate;
    }
    if (endDate) {
        updateBooking.endDate = endDate;
    }
    await updateBooking.save();
    return res.json(updateBooking)

});

router.delete('/:bookingId', requireAuth, requireAuthorDeleteBooking, async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const deleteBooking = await Booking.findByPk(bookingId);
    if (new Date(deleteBooking.startDate).getTime() < new Date().getTime()) {
        return res.status(403).json(
            {
                "message": "Bookings that have been started can't be deleted",
                "statusCode": 403
            }
        )
    }
    await deleteBooking.destroy();
    res.json(
        {
        "message": "Successfully deleted",
        "statusCode": 200
        }
    );
});


module.exports = router;
