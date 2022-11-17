import { csrfFetch } from './csrf';

const ADD_REVIEW = 'reviews/addReview';
const LOAD_REVIEWS = 'reviews/loadReviews';
const REMOVE_REVIEW = 'reviews/removeReview';
const LOAD_SPOT_REVIEWS = 'reviews/loadSpotReviews'


export function displaySpotReviews(reviews) {
    return {
        type: LOAD_SPOT_REVIEWS,
        reviews
    }
}


export function addReview(review) {
    return {
        type: ADD_REVIEW,
        review
    }
}

export function removeReview(reviewId) {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        dispatch(displaySpotReviews(data.Reviews));
        return data;
    } else {
        return response;
    }
}

export const createReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        return data;
    } else {
        return response;
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'delete'
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(removeReview(reviewId));
    } else {
        return response;
    }
}

let initializedState = {
    spot: {},
    user: {}
}

export default function reviewsReducer(state = initializedState, action) {
    let newState;
    switch (action.type) {
        case LOAD_SPOT_REVIEWS: {
            newState = {spot:{}, user:{}};
            const reviews = action.reviews;
            reviews.map(review => newState.spot[review.id] = review)
            return newState
        }
            
        case ADD_REVIEW: {

        }
            
        case REMOVE_REVIEW: {

        }
            
        default: 
            return state
    }
}









// reviews: {
//     // When on a single spot, use the spot slice.
//     spot: {
//         [reviewId]: {
//             reviewData,
//                 User: {
//                 userData,
//         },
//             ReviewImages: [imagesData],
//     }
// }
