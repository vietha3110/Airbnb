import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots'; 
const ADD_SPOT = 'spots/addSpot';
const REMOVE_SPOT = 'spots/removeSpot';
const LOAD_DETAIL_SPOT = 'spots/loadDetailSpot';
const LOAD_USER_SPOTS = 'spots/loadUserSpots';

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

export function displayDetailedSpot(spot) {
    return {
        type: LOAD_DETAIL_SPOT,
        spot
    }
}

export function displayUserSpots(spots) {
    return {
        type: LOAD_USER_SPOTS,
        spots
    }
}

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch(`api/spots`);
    const spotsData = await response.json();
    dispatch(displaySpots(spotsData.Spots));
    return response;
} 

export const createSpot = (spot) => async (dispatch) => {
    const { name, description, address, city, country, state, lat, lng, price, url, preview } = spot;
    const response = await csrfFetch(`/api/spots`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, address, city, country, state, lat, lng, price })
    });
    if (response.ok) {
        const data = await response.json();
        //spotId = data.id
        const imgResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, preview })
        }); 
        //else (return response)
        if (imgResponse.ok) {
            const imgData = await imgResponse.json();
            const imgUrl = imgData.url;
            data.previewImage = imgUrl
            //imageData {id, url, preview}
            dispatch(addSpot(data));
            return data;
        }
        //else (return imgResponse)
        
    }
    //handleErrors fetch1 , 
    //handleErrors fetch2,
    
    
}

export const fetchOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(displayDetailedSpot(data));
    // return response;
}

export const getUserSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots/current`);
    const data = await response.json();
    dispatch(displayUserSpots(data));
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
        case LOAD_SPOTS: {
            newState = { ...state };
            //newState.allSpot = action.spots
            //normalize state
            newState.Spots = action.spots
            return newState;
        }
            
        case ADD_SPOT: {
            newState = { ...state, ...action.spot };
            return newState
            //falls through
        }
           
        case LOAD_DETAIL_SPOT: {
            newState = { ...state };
            //newState.singleSpot = action.spot 
            //normalize state
            // newState = action.spot
            const spotData = action.spot
            return spotData;
        }
            
        case LOAD_USER_SPOTS: {
            newState = { ...state }
            newState = action.spots
            return newState;
        }
            
        default: 
            return state
    }
}
