const express = require('express');

const { setTokenCookie, requireAuth, requireSpotImage } = require('../../utils/auth.js');
const { User, Booking, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();


//delete image
router.delete('/:imageId', requireAuth, requireSpotImage, async (req, res, next) => {
    const spotImageId = req.params.imageId; 
    const spotImage = await SpotImage.findByPk(spotImageId);
    await spotImage.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
})





module.exports = router
