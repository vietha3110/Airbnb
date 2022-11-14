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
        if (imgResponse.ok) {
            const imgData = await imgResponse.json();
            const imgUrl = imgData.url;
            data.previewImage = imgUrl
            //imageData {id, url, preview}
            dispatch(addSpot(data));
        }
        
    }
    //handleErrors fetch1 , 
    //handleErrors fetch2,
    
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
            newState.Spots = action.spots
            return newState;
        case ADD_SPOT:
            newState = { ...state };
            newState.Spots.push(action.spot);
        default: 
            return state
    }
}
