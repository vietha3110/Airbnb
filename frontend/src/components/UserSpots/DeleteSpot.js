import { useDispatch } from "react-redux";
import { useState } from "react";
import * as spotsActions from '../../store/spots';
import './DeleteSpot.css';

export function DeleteSpot(props) {
    const spot = props.spot;
    const modal = props.onClose;
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const handleYesButton = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        dispatch(spotsActions.deleteSpot(spot))
        .then(() => modal())
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let error = Object.values(data.errors)
                setValidationErrors(error);
            }
        })
    }
    if (validationErrors.length > 0) {
        alert("There is an error! Please try again!")
    }
    const handleCancelButton = (e) => {
        e.preventDefault();
        modal();
    }
    return (
        <div className="delete-component">
            <div className="delete-question">
                Please confirm the deletion of this spot:
            </div>
            <div className="delete-btn">
                <button onClick={handleYesButton} className='btn-delete'>Confirm</button>
                <button onClick={handleCancelButton}className='btn-cancel'>Cancel</button>
            </div>
            
        </div>
    )
}
