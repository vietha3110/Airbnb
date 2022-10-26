const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Review, Booking } = require('../db/models');
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
const requireAuth = function (req, _res, next) {
    if (req.user) {
        return next();
    }
    const err = new Error('Unauthorized'); 
    // err.title = 'Unauthorized';
    // err.errors = ['Unauthorized'];
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
        err.message = 'Forbidden';
        err.status = 403;
        return next(err);
    } else { 
        return next();
    }
}
//propere required for booking(edit/delete)

const requireAuthorUpdateBooking = async function (req, res, next) {
    const userId = req.user.id; 
    
}



module.exports = { setTokenCookie, restoreUser, requireAuth, requireAuthor , requireAuthorReview, requireAuthorCreateBooking};
