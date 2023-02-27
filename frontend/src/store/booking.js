import { csrfFetch } from './csrf';

const LOAD_USERBOOKINGS = 'bookings/loadUserBookings';
const LOAD_SPOTBOOKINGS = 'bookings/loadSpotBookings'; 
const CREATE_BOOKING = 'bookings/createBooking';
const REMOVE_BOOKING = 'bookings/removeBooking';
const EDIT_BOOKING = 'bookings/editBooking';

export function loadUserBookings(bookings) {
    return {
        type: LOAD_USERBOOKINGS,
        bookings
    }
}

export function loadSpotBookings(bookings) {
    return {
        type: LOAD_SPOTBOOKINGS,
        bookings
    }
}

export function createBooking(booking) {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export function removeBooking(bookingId) {
    return {
        type: REMOVE_BOOKING,
        bookingId
    }
}

export function editBooking(booking) {
    return {
        type: EDIT_BOOKING,
        booking
    }
}

export const fetchUserBookings =  () => async (dispatch) =>{
    try {
        const response = await csrfFetch(`/api/bookings/current`);
        const data = await response.json();
        dispatch(loadUserBookings(data));
    } catch (err) {
        throw err;
    }
}

export const fetchSpotBookings = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
        const data = await response.json(); 
        dispatch(loadSpotBookings(data))
    } catch (err) {
        throw err;
    }
}

export const makeBooking = (booking) => async (dispatch) => {
    const { startDate, endDate, spotId } = booking;
    try { 
        const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({startDate, endDate})
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(createBooking(data));
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch (err) {
        throw err;
    }
}

export const updateBooking = (booking) => async (dispatch) => {
    try {

    } catch (err) {
        throw err;
    }
}

export const deleteBooking = (bookingId) => async (dispatch) => { 
    try {
        const response = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(removeBooking(bookingId))
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch (err) {
        throw err;
    }
}
let initialState = {
    user: {}, spot: {}
}
export default function bookingsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_USERBOOKINGS: {
            newState = deepCopy(state)
            const bookings = action.bookings.Bookings;
            for (let booking of bookings) {
                newState.user[booking.id] = booking;
            };
            return newState;
        }
        
        case LOAD_SPOTBOOKINGS: {
            newState = deepCopy(state);
            const bookings = action.bookings.Bookings;
            newState.spot = bookings;
            return newState;
        }    
            
        case CREATE_BOOKING: {      
            newState = deepCopy(state);
            const booking = action.booking;
            newState.user[booking.id] = booking;
            return newState;
        }
           
       
       
        // case EDIT_BOOKING: {
        //     newState = { ...state };
        //     const spot = action.spot;
        //     newState.allSpots[spot.id] = spot;
        //     return newState;
        // }
            
        case REMOVE_BOOKING: {
            newState = deepCopy(state);
            const bookingId = action.bookingId;
            delete newState.user[bookingId];
            return newState;
        }    
        default: 
            return state
    }
}
function deepCopy(value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(element => deepCopy(element));
        } else {
            const result = {};
            Object.entries(value).forEach(entry => {
                result[entry[0]] = deepCopy(entry[1]);
            });
            return result;
        }
    } else {
        return value;
    }
}
