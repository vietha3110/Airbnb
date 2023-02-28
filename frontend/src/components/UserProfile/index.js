import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as bookingAction from '../../store/booking';
import * as spotAction from '../../store/spots';
import './index.css';
import { Link } from 'react-router-dom';
import CancelTripModal from './CancelModal/CancelModal';
import { useState } from 'react';

export function UserProfile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userBooking = useSelector(state => state.bookings.user);
    console.log(userBooking);
    useEffect(() => {
        dispatch(bookingAction.fetchUserBookings());
    }, [dispatch]);
    


    return (
        <>
            {
                sessionUser && 
                <>
                    <div className='bookings-container'>
                        <div className='booking-trips'>
                            <h2>Trips</h2>
                            <div className='booking-trips-info'>
                                {
                                    Object.values(userBooking).length > 0 && Object.values(userBooking).map(booking => (
                                        <div>
                                            <Link className='booking-trip-detail' to={`/spots/${booking.spotId}`}>
                                                <div className='booking-trip-img'>
                                                    <img src={booking.Spot.previewImage}></img>
                                                </div>
                                                <div className='booking-trip-content'>
                                                    <span className='booking-city'>
                                                        {booking.Spot.city}
                                                    </span>
                                                    <div className='booking-date-info'>
                                                        <span className='booking-date'>{booking.startDate.substring(0,10)}</span>
                                                        <span className='booking-date'>{booking.endDate.substring(0,10)}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div>
                                                <CancelTripModal bookingId={booking.id} />
                                            </div>
                                        </div>

                                        )
                                    )
                                }
                                {
                                    Object.values(userBooking).length === 0 && 
                                    <div>
                                            You have no trips.
                                    </div>
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
