import { csrfFetch } from './csrf';

const LOAD_BOOKINGS = 'bookings/loadBookings'; 
const CREATE_BOOKING = 'bookings/createBooking';
const REMOVE_BOOKING = 'bookings/removeBooking';
const EDIT_BOOKING = 'bookings/editBooking';

export function loadUserBookings(bookings) {
    return {
        type: LOAD_BOOKINGS,
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

export const makeBooking = (booking) => async (dispatch) => {
    const spotId = booking.spotId;
    const { startDate, endDate } = booking;
    try { 
        const response = csrfFetch(`/api/spots/#${spotId}/booking`, {
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

    } catch (err) {

    }
}
let initialState = {
    bookings: {}
}
export default function bookingsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_BOOKINGS: {
            newState = { ...state };
            for (let booking of action.bookings) {
                newState.bookings[booking.id] = booking;
            };
            return newState
        }
            
        case CREATE_BOOKING: {      
            newState = { ...state };
            const booking = action.booking;
            newState.bookings[booking.id] = booking;
            return newState;
        }
           
       
       
        // case EDIT_BOOKING: {
        //     newState = { ...state };
        //     const spot = action.spot;
        //     newState.allSpots[spot.id] = spot;
        //     return newState;
        // }
            
        // case REMOVE_BOOKING: {
        //     newState = { ...state };
        //     // const spotId = action.spotId;
        //     delete newState.allSpots[action.spotId];
        //     return newState;
        // }    
        default: 
            return state
    }
}
