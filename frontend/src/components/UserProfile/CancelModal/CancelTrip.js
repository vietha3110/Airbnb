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
        <div className="cancel-component">
            <div className="cancel-question">
                Do you want to cancel the trip?
            </div>
            <div className="cancel-err">
                {
                    validationErrors && 
                    
                    <span> {validationErrors}</span>
                
                }
            </div>
            <div className="cancel-btn">
                {  
                    !validationErrors && 
                    <>
                        <button onClick={handleYesButton} className='cancel-delete'>Yes</button>
                        <button onClick={handleCancelButton}className='cancel-cancel'>No</button>
                    </>
                }
                {
                    validationErrors && 
                    <button onClick={handleCancelButton}className='cancel-ok'>Ok
                    </button>
                }
               
            </div>
            
        </div>
    )
}
