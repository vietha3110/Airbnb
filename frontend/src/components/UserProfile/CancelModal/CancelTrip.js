import { useDispatch } from "react-redux";
import { useState } from "react";
// import * as spotsActions from '../../store/spots';
// import './DeleteSpot.css';
import * as bookingAction from '../../../store/booking';

export function CancelTrip(props) {
    const bookingId = props.bookingId;
    const modal = props.onClose;
    const [validationErrors, setValidationErrors] = useState("");
    const dispatch = useDispatch();
    const handleYesButton = (e) => {
        e.preventDefault();
        console.log(bookingId)
        setValidationErrors("");
        dispatch(bookingAction.deleteBooking(bookingId))
            .then(() => modal())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setValidationErrors(data.message);
                }
        })
        
    }
   
    const handleCancelButton = (e) => {
        e.preventDefault();
        modal();
    }
    return (
        <div className="delete-component">
            <div className="delete-question">
                Do you want to cancel the trip?
            </div>
            {
                validationErrors && 
                <div>
                        {validationErrors}
                </div>
            }
            <div className="delete-btn">
                <button onClick={handleYesButton} className='btn-delete'>Yes</button>
                <button onClick={handleCancelButton}className='btn-cancel'>No</button>
            </div>
            
        </div>
    )
}
