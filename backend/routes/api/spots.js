const express = require('express');

const { setTokenCookie, requireAuth, requireAuthor } = require('../../utils/auth.js');
const { User, Spot, Review, SpotImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require('sequelize'); 
const { route } = require('./session.js');
const spotimage = require('../../db/models/spotimage.js');

const router = express.Router();

//get all spot
router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
                ],
                [
                    sequelize.col('SpotImages.url'), 'previewImage'
                ]
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            }, {
                model: SpotImage,
                attributes: []
                
            }
        ],
    });
    res.json({ Spots })
})


//get all spots owned by the current
router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id;
    const Spots = await Spot.findByPk(id, {
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
                ],
                [
                    sequelize.col('SpotImages.url'), 'previewImage'
                ]
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            }, {
                model: SpotImage,
                attributes: []
                
            }
        ],
    });
    res.json({ Spots })
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
    });
    if (spot.id) {
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
    try {
        const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;
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
    } catch (e) {
        console.log(e.message)
    }
});

//Add an image to a spot 

router.post('/:spotId/images', requireAuth, requireAuthor, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(spotId);
    // if (spot) {
    //     const spotImage = await spot.createSpotImage({
    //         url,
    //         preview
    //     }, {
    //         fields: [
    //             []
    //         ]
    //     });
    //     // const imageData = spotImage.toJSON();
    //     // delete imageData.createdAt;
    //     // delete imageData.updatedAt;
    //     res.json({
    //         ...imageData
    //     }
    //     )
    // } else {
    //     res.status
    // }
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


module.exports = router;
