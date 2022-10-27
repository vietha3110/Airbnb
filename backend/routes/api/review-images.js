const express = require('express');

const { setTokenCookie, requireAuth, requireReviewImage } = require('../../utils/auth.js');
const { User, Booking, Spot, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();


//delete image
router.delete('/:imageId', requireAuth, requireReviewImage, async (req, res, next) => {
    const reviewImageId = req.params.imageId; 
    const reviewImage = await ReviewImage.findByPk(reviewImageId);
    await reviewImage.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
  
})

module.exports = router;
