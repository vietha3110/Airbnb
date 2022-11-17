const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Review, Booking, SpotImage, ReviewImage } = require('../db/models');
const review = require('../db/models/review');

const { secret, expiresIn } = jwtConfig;

//Sents a JWT cookie

const setTokenCookie = (res, user) => {
    //create TOKEN here:
    const token = jwt.sign({
        data: user.toSafeObject()
    },
        secret,
        {
            expiresIn: parseInt(expiresIn)
        }
    );
    
    const isProduction = process.env.NODE_ENV === 'production';
    //set the token cookie 
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, //maxAge in milliseconds 
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax'
    });

    return token;
};
//certain authenticated routes require the identity of current session user.
//create & utilize a middleware function called restoreUser => restore the session user based on the contents of the JWT cookie
const restoreUser = (req, res, next) => {
    //token parsed from cookies
    const { token } = req.cookies;
    req.user = null;
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

//if there is no current user, return error 
const requireAuth = function (req, res, next) {
    if (req.user) {
        return next();
    }
    const err = new Error('Unauthorized'); 
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.message = 'Authentication required'
    err.status = 401;
    return next(err);
    
}

//proper required for spot
const requireAuthor = async function (req, res, next) {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        // const err = new Error('Couldnt find Spot');
        // err.message = `Spot couldn't be found`;
        // err.status = 404;
        // return next(err);
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const ownerId = spot.ownerId;
    const userId = req.user.id;
    if (userId === ownerId) {
        return next();
    } else {
        const err = new Error('Unauthorized');
        err.message = 'Forbidden';
        err.status = 403;
        // console.log(`Error in requireAuthor`)
        return next(err);
    }
};

// proper required for review
const requireAuthorReview = async function (req, res, next) {
    const reviewId = req.params.reviewId; 
    const userId = req.user.id; 
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    const userReviewId = review.userId; 
    if (userId === userReviewId) {
        return next();
    } else {
        const err = new Error('Unauthorized');
        err.message = 'Forbidden';
        err.status = 403;
        return next(err);
    }
}

//proper required for create bookings 
const requireAuthorCreateBooking = async function (req, res, next) {
    const userId = req.user.id;
    const spotId = req.params.spotId; 
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const ownerId = spot.ownerId;
    if (userId === ownerId) {
        const err = new Error('Unauthorized');
        err.message = 'You cant book your place';
        err.status = 403;
        return next(err);
    } else { 
        return next();
    }
}
//propere required for booking(edit)

const requireAuthorUpdateBooking = async function (req, res, next) {
    const userId = req.user.id; 
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    } else {
        const userBookingId = booking.userId; 
        if (userId === userBookingId) {
            next();
        } else {
            const err = new Error('Unauthorized');
            err.message = 'This booking doesnt belong to you';
            err.status = 403;
            return next(err);
        }
    }  
}

//propere required for booking(delete)

const requireAuthorDeleteBooking = async function (req, res, next) {
    const userId = req.user.id; 
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    } else {
        const spotId = booking.spotId;
        const spot = await Spot.findByPk(spotId);
        const ownerId = spot.ownerId;
        const userBookingId = booking.userId;
        if (userId === userBookingId || userId === ownerId) {
            next()
        } else {
            const err = new Error('Unauthorized');
            err.message = 'This is not your booking or you are not the owner of the booking spot';
            err.status = 403;
            return next(err);
        }
    }
}

//proper require to delete spot images 

const requireSpotImage = async function (req, res, next) {
    const userId = req.user.id;
    const spotImageId = req.params.imageId; 
    const spotImage = await SpotImage.findByPk(spotImageId, {
        attributes: ['spotId']
    }); 

    if (!spotImage) {
        res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    } else {
        const spotId = spotImage.spotId; 
        
        const spot = await Spot.findByPk(spotId);
        const ownerId = spot.ownerId; 
        if (userId === ownerId) {
            next()
        } else {
            const err = new Error('Unauthorized');
            err.message = 'You are not the owner of this spot';
            err.status = 403;
            next(err);
        }
    }
}

//proper require delete review images 

const requireReviewImage = async function (req, res, next) {
    const userId = req.user.id;
    console.log(userId)
    const reviewImageId = req.params.imageId;
    const reviewImage = await ReviewImage.findByPk(reviewImageId, {
        attributes: ['reviewId']
    });
    if (!reviewImage) {
        res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    } else {
        const reviewId = reviewImage.reviewId;
        const review = await Review.findByPk(reviewId);
        const userReviewId = review.userId;
        console.log(userReviewId)
        if (userId === userReviewId) {
            next();
        } else {
            const err = new Error('Unauthorized');
            err.message = 'You did not write this review';
            err.status = 403;
            next(err);
        }
    }
}


module.exports = { setTokenCookie, restoreUser, requireAuth, requireAuthor , requireAuthorReview, requireAuthorCreateBooking,requireAuthorUpdateBooking, requireAuthorDeleteBooking, requireSpotImage,requireReviewImage };
