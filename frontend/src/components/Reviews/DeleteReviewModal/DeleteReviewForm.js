import { useDispatch } from "react-redux";
import { useState } from "react";
import * as reviewsActions from '../../../store/reviews';

export function DeleteReviewForm(props) {
    const reviewId = props.review;
    const modal = props.onClose;
    const spotId = props.spotId;
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();

    const handleYesButton = (e) => {
        e.preventDefault();
        setValidationErrors([]);
        dispatch(reviewsActions.deleteReview(reviewId))
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
                Are you sure to delete this review?
            </div>
            <div className="delete-btn">
                <button onClick={handleYesButton} className='btn-delete'>Delete</button>
                <button onClick={handleCancelButton} className='btn-cancel'>Cancel</button>
            </div>
        </div>
    )
}
