import {useState } from "react";
import * as reviewsAction from '../../../store/reviews';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './index.css';

export function ReviewForm(props) {
    const [rating, setRating] = useState();
    const [review, setReview] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const modal = props.onClose;
    const spotId = props.spotId;
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors([]);
        if (!sessionUser) return setValidationErrors(['Please login to rate this spot'])
        const info = {
            stars: rating, review
        }
        dispatch(reviewsAction.createReview(spotId, info))
            .then(() => modal())
            .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.message) {
                            setValidationErrors(['You already rated this spot!']);
                        }
            });
        history.push(`/spots/${spotId}`);
    }

    const handleCancelButton = (e) => {
        e.preventDefault();
        modal();
    }

    return (
        <div className="reviewform-container">
            <div className="reviewform-welcome">
                <h2>Please leave a review for this place</h2>
            </div>
            <form onSubmit={handleSubmit} className='reviewform-info'>
                <div>
                {validationErrors.length > 0 && 
                    <ul>
                        {validationErrors.map(error => 
                            <li key={error}>{error}</li>)}
                    </ul>
                }
                </div>
                <div className="review-content">
                    <div className="reviewform-rating">
                        <label> Rating point
                            <input
                                type='number'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                min="1"
                                max="5"
                    
                            />
                        </label>
                        <div className="reviewform-description">
                            <label>
                                <textarea
                                    placeholder='Share details of your own experience at this spot'
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                    
                                >
                                </textarea>
                            </label>
                        </div>
                </div>
                </div> 
                <button type="submit">Submit</button>
                <button onClick={handleCancelButton}>Cancel</button>
            </form>
        </div>
    )
}
