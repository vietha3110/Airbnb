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


let initializedState = {
    allSpots: {},
    singleSpot: {}
}
//fail => start with {}

export default function bookingsReducer(state = initializedState, action) {
    switch (action.type) {
        // case LOAD_BOOKINGS: {
        
        // }
            
        // case CREATE_BOOKING: {            
        // }
           
       
       
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
