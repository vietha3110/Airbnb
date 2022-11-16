import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewsAction from '../../store/reviews';
import './ListingSpotReviews.css';

export function ListingSpotReviews({spotId}) {
    const dispatch = useDispatch();
    const reviewObj = useSelector(state => state.reviews);
    const reviews = Object.values(reviewObj.spot);
    const totalReviews = reviews.length;


    useEffect(() => {
        dispatch(reviewsAction.fetchSpotReviews(spotId))
    }, [dispatch])

    return (
        <div>
            <h2>Total Reviews: {totalReviews}</h2>
            <div>
                {reviews?.length > 0 && reviews.map(review => (
                    <div key={review.id}>
                        <div>{review.User.firstName}</div>
                        <div>{review.star}</div>
                        <div>{review.review}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
