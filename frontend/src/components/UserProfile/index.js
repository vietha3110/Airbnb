import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as bookingAction from '../../store/booking';
import * as spotAction from '../../store/spots';
import './index.css';
import { Link } from 'react-router-dom';


export function UserProfile() {
    const dispatch = useDispatch();
    // const reviews = useSelector(state => state.userReviews);
    const sessionUser = useSelector(state => state.session.user);
    const userBooking = useSelector(state => state.bookings.user);
    const spots = useSelector(state => state.spots.allSpots)
    // if (!sessionUser) return (
    //     <div>
    //         Please login to see this page!
    //     </div>
    // )
    if (userBooking) {
        console.log(Object.values(userBooking))
    }
    useEffect(() => {
        dispatch(bookingAction.fetchUserBookings());
        dispatch(spotAction.fetchSpots());
    },[dispatch])

    return (
        <>
            {
                sessionUser && 
                <>
                    <div className='bookings-container'>
                        {/* <div className='bookings-header'>
                            <h2>Trips</h2>
                        </div>
                        <div className='bookings-upcoming'>
                            Upcomming Trip        
                        </div> */}
                        <div className='booking-trips'>
                            <h2>Trips</h2>
                            <div className='booking-trips-info'>
                                {
                                    userBooking && Object.values(userBooking).map(booking => (
                                        <Link className='booking-trip-detail' to={`/spots/${booking.spotId}`}>
                                            <div className='booking-trip-img'>
                                                <img src={spots[booking.spotId].previewImage}></img>
                                            </div>
                                            <div className='booking-trip-content'>
                                                <span className='booking-city'>
                                                    {spots[booking.spotId].city}
                                                </span>
                                                <div className='booking-date-info'>
                                                    <span className='booking-date'>{booking.startDate.substring(0,10)}</span>
                                                    <span className='booking-date'>{booking.endDate.substring(0,10)}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        )
                                    )
                                }
                            </div>    
                        </div>    

                    </div>
                </>
            } 
            {
                !sessionUser && 
                <div>
                         Please login to see this page!
                </div>
            }
            

        </>
        
    )
}
