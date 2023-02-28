import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { useHistory } from "react-router-dom/";
import './index.css';
import 'react-dates/lib/css/_datepicker.css';
import * as bookingAction from '../../../store/booking';


const BookingCalendar = ({ avgRating, reviews, price, id, spotBooking, user }) => {
    // let objDate = new Date();
    // let dateFormat = objDate.getMonth() + "/" + objDate.getDate() + "/" + objDate.getFullYear();
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null); 
    const [focusedInput, setFocusedInput] = useState(null);
    const [err, setErr] = useState("");
    const [durr, setDurr] = useState(0);
    const moment = extendMoment(Moment);
    const history = useHistory();
    const dispatch = useDispatch();
    const onReserve = () => {
        const startDate = start._d.toISOString().slice(0, 10);
        const endDate = end._d.toISOString().slice(0, 10);
        
        const bookingInfo = { startDate, endDate, spotId: id };
        dispatch(bookingAction.makeBooking(bookingInfo))
            .then(() => {
                history.push('/bookings');
            })
            .catch(async (error) => {
                const data = await error.json();
                setErr(data.message)
            })
    }

    const blockDays = (date) => {
        let blocked = [];
        let bookedRanges = [];
        spotBooking.forEach((booking) => {
            bookedRanges = [
                ...bookedRanges,
                moment.range(booking.startDate, booking.endDate),
              ];
            });
        
            blocked = bookedRanges.find((range) => {
              return range.contains(date);
            });
            return blocked; 
    }
    const duration = (startDate, endDate) => {
        const moment1 = moment(startDate._d);
        const moment2 = moment(endDate._d);
        const diff = moment2.diff(moment1);
        const diffInDays = moment.duration(diff).asDays();
        setDurr(diffInDays.toFixed(0));
    }
    return (
        <div className="booking-container">
            <div className="booking-title">
                <div className="booking-title-left">
                    <span>$ </span>
                    <span style={{fontSize:"1.2rem", fontWeight:"700"}}> {price} </span>
                    <span>night</span>
                </div>
                <div className="booking-title-right">
                    <div>
                        <i className="fa-solid fa-star"></i>                    
                        <span>{avgRating} -</span>
                    </div>
                    <span style={{paddingLeft:"0.3rem"}}>{reviews} reviews</span>
                </div>
            </div>
            {
                !user && 
                <div className="booking-condition-user">
                        Please login to reserve this place!
                </div>
            }
            <div className="booking-err">
                {
                    err && 
                            <span>{err}</span>
                    
                }
            </div>
            <div className="booking-content">
                <div className="booking-info">
                    <div className="booking-info-box">
                        {/* <div className="booking-info-time">
                                <div className="booking-info-time-label left"><label>Checkin</label></div>
                                <div className="booking-info-time-label"><label>Checkout</label></div>
                        </div> */}
                        <DateRangePicker
                            startDate={start} // momentPropTypes.momentObj or null,
                            startDateId="startDate" // PropTypes.string.isRequired,
                            endDate={end} // momentPropTypes.momentObj or null,
                            endDateId="endDate" // PropTypes.string.isRequired,
                            onDatesChange={({ startDate, endDate }) => {
                                setStart(startDate);
                                setEnd(endDate);
                                duration(startDate, endDate);
                            }}// PropTypes.func.isRequired,
                            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                            isDayBlocked={blockDays}
                            minimumNights={1}
                        />
                        {/* <div className="booking-info-guest">
                            <select className="booking-info-guest-select">
                                <option value="">-- Select Number of Guests --</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div> */}
                    </div>
                    {
                        (!user || start === null || end === null) && 
                        <div className="booking-info-disabledbtn " >
                        <span>Reserve</span>
                    </div>
                    }
                    {
                       user && start && end && 
                        <div className="booking-info-cfbtn" onClick={onReserve}>
                        <span>Reserve</span>
                    </div>
                    }
                   
                    <div className="booking-info-cfstm">
                        <span>You won't be charge yet</span>
                    </div>
                    <div className="booking-price">
                        {
                            user && start && end && 
                            <>
                                <div className="booking-price-detail">
                                    <div className="booking-price-detail-title">
                                        <span>${price} x {durr} nights</span>
                                        <span>Cleaning Fee</span>
                                        <span>Service Fee</span>
                                    </div>
                                    <div className="booking-price-detail-title">
                                        <span>$ {price * durr}</span>
                                        <span>$ 0</span>
                                        <span>$ {price * 0.01}</span>
                                    </div>
                                </div>
                            <div className="booking-price-total">
                                <span>
                                    Total
                                </span>
                                <span>
                                    $ {price * durr + price * 0.01}
                                </span>
                            </div>
                        </>
                        }
                        {
                            user && !start && !end && 
                            <>
                                <div className="booking-price-detail">
                                    <div className="booking-price-detail-title">
                                        <span>${price} x 1 nights</span>
                                        <span>Cleaning Fee</span>
                                        <span>Service Fee</span>
                                    </div>
                                    <div className="booking-price-detail-title">
                                        <span>${price * 1}</span>
                                        <span>$0</span>
                                        <span>$2</span>
                                    </div>
                                </div>
                            <div className="booking-price-total">
                                <span>
                                    Total before taxes
                                </span>
                                <span>
                                    ${price + 2}
                                </span>
                            </div>
                        </>
                        }

                    </div>
                </div>
            </div>

       
            
        </div>
    )
}

export default BookingCalendar;
 