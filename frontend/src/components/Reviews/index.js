import { useState } from "react";

export function ReviewForm() {
    const [rating, setRating] = useState();
    const [review, setReview] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    return (
        <div>
            <div>
                <h2>Please leave a review for this place</h2>
            </div>
            <form>
                <div>Error will be here</div>
                <div>
                    <label> Rating point
                        <input
                            type='number'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </label>
                    <label>
                        <textarea
                            placeholder='Share details of your own experience at this spot'
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        >
                        </textarea>
                    </label>
                </div> 
                <button>Submit</button>
            </form>
        </div>
    )
}
