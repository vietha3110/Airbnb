import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';


const BookingCalendar = () => {

    return (
        <div className="booking-container">
            <div className="booking-title">
                <span>Price</span>
                <div className="booking-title-right">
                    <span>rating</span>
                    <span>Total reviews</span>
                </div>
            </div>
            <div className="booking-content">
                <div className="booking-info">
                    <div className="booking-info-box">
                        <div className="booking-info-time">
                            <div className="booking-info-checkin">
                                <span>Checkin</span>
                                <input type="date" className="booking-info-timeinput"></input>
                            </div>
                            <div className="booking-info-checkout">
                                <span>Checkout</span>
                                <input type="date" className="booking-info-timeinput"></input>
                            </div>
                        </div>
                        <div className="booking-info-guest">
                            <span>Guest</span>
                           <input type="number" min={1} max={10} placeholder="max 10 guests"></input>
                        </div>
                    </div>
                    <div className="booking-info-cfbtn">
                        <span>Reserve</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingCalendar;
 