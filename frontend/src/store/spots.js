import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots'; 
const ADD_SPOT = 'spots/addSpot';
const REMOVE_SPOT = 'spots/removeSpot';
const LOAD_DETAIL_SPOT = 'spots/loadDetailSpot';

export function displaySpots(spots) {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export function addSpot(spot) {
    return {
        type: ADD_SPOT,
        spot
    }
}

export function deleteSpot(spot) {
    return {
        type: REMOVE_SPOT,
        spot
    }
}

// export function displayDetailedSpot(spot) {
//     return {
//         type: LOAD_DETAIL_SPOT,
//         spot
//     }
// }

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch(`api/spots`);
    const spotsData = await response.json();
    dispatch(displaySpots(spotsData));
    return response;
} 

export const createSpot = (spot) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
      });
    const data = await response.json();
    dispatch(addSpot(data));
    return response;
}

// export const deleteSpot = (spotId) => async (dispatch) => {
//     const response = await csrfFetch((`api/spots`), {
//         method: 'delete',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(spotId)
//     });
//     const data = await response.json();
//     dispatch(addSpot(data));
//     return response;
// }


export default function spotsReducer(state = {}, action) {
    let newState; 
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state };
            return newState;
        default: 
            return state
    }
}
