import { useDispatch } from "react-redux";
import { useState } from "react";
import * as spotsActions from '../../store/spots';

export function DeleteSpot(props) {
    const spot = props.spot;
    const modal = props.onClose;
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const handleYesButton = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        console.log(spot)
        dispatch(spotsActions.deleteSpot(spot))
        .then(() => modal())
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setValidationErrors(data.errors);
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
        <div>
            <div>
                Are you sure you want to delete this spot?
            </div>
            <button onClick={handleYesButton}>Yes, I am.</button>
            <button onClick={handleCancelButton}>No, I wanna cancel this action.</button>
        </div>
    )
}
