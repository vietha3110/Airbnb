const express = require('express');

const { setTokenCookie, requireAuth, requireAuthor, requireAuthorCreateBooking } = require('../../utils/auth.js');
const { User, Spot, Review, SpotImage, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require('sequelize'); 
const { route } = require('./session.js');
const spotimage = require('../../db/models/spotimage.js');
const { Op } = require('sequelize');
const spot = require('../../db/models/spot.js');

const router = express.Router();

//validate query
const validateQuery = [
    check('page')
        .optional()
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Size must be greater than or equal to 1'),
    check('minLat')
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Minimum latitude is invalid'),
    check('maxLat')
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Maximum latitude is invalid"'),
    check('minLng')
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Minimum longitude is invalid'),
    check('maxLng')
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Max longitude is invalid'),
    check('minPrice')
        .optional()
        .exists({ checkFalsy: true })
        .isFloat({min:0})
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .exists({ checkFalsy: true })
        .isFloat({min:0})
        .withMessage('Maximum price must be greater than or equal to 0'),
  
    handleValidationErrors
];




//get all spot
router.get('/',validateQuery, async (req, res, next) => {
    let { page, size, maxLat, minLat, maxLng, minLng, minPrice, maxPrice } = req.query;
    page = parseInt(page); 
    size = parseInt(size); 
    if (page > 10) {
        page = 10
    }
    if (size > 20) {
        size = 20
    }
    let pagination = {}; 
    if (page, size) {
        pagination.limit = size; 
        pagination.offset = size * (page - 1);
    }
   

    const spots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
                ],
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
        ],
        group: ['Spot.id'],
        raw: true,
        ...pagination,
        subQuery: false
    });

    for (let spot of spots) {
        const image = await SpotImage.findAll({
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
            raw: true
        });
        if (!image.length) {
            spot.previewImage = null;
        } else {
            spot.previewImage = image[0]['url'];
        } 
    }
    if (page && size) {
        res.json({ "Spots": spots, page, size })
    } else {
        res.json({
            "Spots": spots
        })
    }
})

//cant fix datatype
//get all spots owned by the current
router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id;

    const spots = await Spot.findAll({
        where: {
            ownerId: id
        },
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
                ],
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
        ],
        group: ['Spot.id'],
        raw: true
    });

    for (let spot of spots) {
        const image = await SpotImage.findAll({
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
            raw: true
        });
        if (!image.length) {
            spot.previewImage = null;
        } else {
            spot.previewImage = image[0]['url'];
        }  
    }

    res.json({ "Spots": spots });
});

//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                attributes: []
            }, {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            }, {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
                
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'
                ],
            ]
        },
        group: ['Spot.id', 'SpotImages.id', 'Reviews.id', 'Owner.id'],
    });
  
    if (spot) {
        res.json(spot);
    } else {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
});

//Create a spot
const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];


router.post('/', requireAuth, validateCreateSpot, async (req, res, next) => {
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    res.json(spot);
    
});

//Add an image to a spot 

router.post('/:spotId/images', requireAuth, requireAuthor, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (spot) {
        const image = await SpotImage.create({
            url,
            preview,
            spotId
        });
        const newId = image.id;
        const imageData = await SpotImage.scope('defaultScope').findByPk(newId);
        res.json(imageData)
    } else {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
});

router.put('/:spotId', requireAuth, requireAuthor, validateCreateSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
   
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if (address) {
        spot.address = address;
    }
    if (city) {
        spot.city = city;
    }
    if (state) {
        spot.state = state;
    }
    if (country) {
        spot.country = country;
    }
    if (lat) {
        spot.lat = lat;
    }
    if (lng) {
        spot.lng = lng;
    }
    if (name) {
        spot.name = name;
    }
    if (description) {
        spot.description = description;
    }
    if (price) {
        spot.price = price
    }
    await spot.save();
    res.json(spot);
});

//Delete a spot

router.delete('/:spotId', requireAuth, requireAuthor, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    await spot.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})
//get all review by a spot
router.get('/:spotId/reviews', async (req, res, next) => {
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        if (spot) {
            const reviews = await Review.findAll({
                where: {
                    spotId
                },
                include: [
                    {
                        model: User, 
                        attributes: {
                            exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
                        }
                    },
                    {
                    model: ReviewImage,
                    attributes: {
                        exclude: ['reviewId', 'createdAt', 'updatedAt']
                    }
                },
                ]
            });
            res.json({ "Reviews": reviews });
        } else {
            res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }
    
});
//validation review 
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];
//create a review for a spot based on 
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const review = await Review.findOne({
        where: {
            [Op.and]: [
                {
                    spotId
                },
                {
                    userId
                }
            ]
        }
    });
    if (review) {
        res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    } else {
        const { review, stars } = req.body;
        const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
        });
        res.json(newReview);
    }
});

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId; 
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);
   
    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else {
        const ownerId = spot.ownerId;
        //if you are not owner 
        if (userId !== ownerId) {
            const userBookings = await Booking.findAll({
                where: {
                    [Op.and]: [
                        { userId },
                        { spotId }
                    ]
                },
                attributes: {
                    exclude: ['id', 'userId', 'createdAt', 'updatedAt']
                }
            });
            res.json({
                'Bookings': userBookings
            })
        }
        // if you are owner 
        if (userId === ownerId) {
            const ownerBookings = await Booking.findAll({
                where: {
                    spotId
                }, 
                raw: true
            });
            for (let booking of ownerBookings) {
                const user = await User.findByPk(booking.userId, {
                    attributes: {
                        exclude: ['username', 'createdAt', 'updatedAt']
                    }
                });
                booking.User = user;
            }
            res.json({
                'Bookings': ownerBookings
            })
        }
    }
    
});

router.post('/:spotId/bookings', requireAuth, requireAuthorCreateBooking, async (req, res, next) => {
    const spotId = req.params.spotId; 
    const userId = req.user.id;

    const bookings = await Booking.findAll({
        where: {
            spotId
        },
        raw: true
    })
    const { startDate, endDate } = req.body;
    for (let booking of bookings) {
        if (new Date(booking.startDate).getTime() === new Date(startDate).getTime()) {
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
    if (new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
            "endDate": "endDate cannot be on or before startDate"
            }
          })
    }
    const newBooking = await Booking.create({
        userId,
        spotId,
        startDate,
        endDate
    });
    res.json(newBooking)
})

module.exports = router;
