import { csrfFetch } from "./csrf";

const LOAD_USER_REVIEWS = 'user/loadUserReviews'; 
const REMOVE_USER_REVIEW = 'user/removeUserReview';


export function loadUserReviews(userReviews) {
    return {
        type: LOAD_USER_REVIEWS,
        userReviews
    }
}

export function removeUserReview(reviewId) {
    return {
        type: REMOVE_USER_REVIEW,
        reviewId
    }
} 

export const fetchUserReviews= (userId) => async (dispatch) => {
    const response = await csrfFetch(`/reviews/current`);
    const data = await response.json();
    dispatch(loadUserReviews(data));
    return response;
}

export const deleteUserReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/reviews/${reviewId}`);
    // const data = await response.json();
    if (response.ok) {
        dispatch(removeUserReview(reviewId));
    }
}


let initializedState = {userReviews:{}}

export default function userReviewsReducer(state = initializedState, action) {
    let newState;
    switch (action.type) {
        case LOAD_USER_REVIEWS: {
            newState = { userReviews: {} };
            for (let review of action.userReviews) {
                newState.userReviews[review.id] = review
            }
            return newState;
        }
            
        case REMOVE_USER_REVIEW: {
            newState = { ...state } 
            delete newState.userReviews[action.reviewId];
            return newState;
        }
            
        default:
            return state;
    }
}
