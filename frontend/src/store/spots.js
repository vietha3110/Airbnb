import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots'; 
const ADD_SPOT = 'spots/addSpot';
const REMOVE_SPOT = 'spots/removeSpot';
const LOAD_DETAIL_SPOT = 'spots/loadDetailSpot';
const LOAD_USER_SPOTS = 'spots/loadUserSpots';
const EDIT_SPOT = 'spots/editSpot';

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

export function removeSpot(spotId) {
    return {
        type: REMOVE_SPOT,
        spotId
    }
}

export function editSpot(spot) {
    return {
        type: EDIT_SPOT,
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
    // console.log(`line 61`)
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
    dispatch(displayUserSpots(data.Spots));
}

export const updateSpots = (spot) => async (dispatch) => {
    const { name, description, address, city, country, state, lat, lng, price } = spot;
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, address, city, country, state, lat, lng, price })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(editSpot(data))
        return data;
    }

}

export const deleteSpot = (spot) => async (dispatch) => {
    const spotId = spot.id;
    
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'delete',
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeSpot(spotId))
        return data
    } else {
        return response
    }

    
}
let initializedState = {
    allSpots: {},
    singleSpot: {}
}
//fail => start with {}

export default function spotsReducer(state = initializedState, action) {
    let newState; 
    switch (action.type) {
        case LOAD_SPOTS: {
            newState = {allSpots: {}, singleSpot: {}};
            //newState.allSpot = action.spots
            //normalize state
            for (let spot of action.spots) {
                newState.allSpots[spot.id] = spot
            }
            return newState;
        }
            
        case ADD_SPOT: {
            newState = { ...state };
            const spot = action.spot;
            newState.allSpots[spot.id] = spot;
            return newState;
        }
           
        case LOAD_DETAIL_SPOT: {
            newState = { ...state};
            //newState.singleSpot = action.spot 
            //normalize state
            // newState = action.spot
            const spot = action.spot
            newState.singleSpot = spot
            return newState;
        }
            
        case LOAD_USER_SPOTS: {
            newState = {allSpots: {}, singleSpot: {} };
            for (let spot of action.spots) {
                newState.allSpots[spot.id] = spot
            }
            return newState;
        }
            
        case EDIT_SPOT: {
            newState = { ...state };
            const spot = action.spot;
            newState.allSpots[spot.id] = spot;
            return newState;
        }
            
        case REMOVE_SPOT: {
            newState = { ...state };
            // const spotId = action.spotId;
            delete newState.allSpots[action.spotId];
            return newState;
        }    
        default: 
            return state
    }
}
