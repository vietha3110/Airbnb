import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewsAction from '../../store/reviews';
import './ListingSpotReviews.css';

export function ListingSpotReviews({spotId}) {
    const dispatch = useDispatch();
    const reviewObj = useSelector(state => state.reviews);
    const reviews = Object.values(reviewObj.spot);
    const spotReviews = [];
    // console.log(reviews)
    for (let review of reviews) {
        if (review.spotId === +spotId) {
            spotReviews.push(review);
        }
    }
    // console.log(`i wanna see this one`,spotReviews);
    const totalReviews = spotReviews.length;


    useEffect(() => {
        dispatch(reviewsAction.fetchSpotReviews(spotId))
    }, [dispatch])

    return (
        <div>
            <h2>Total Reviews: {totalReviews}</h2>
            <div>
                {spotReviews?.length > 0 && spotReviews.map(review => (
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
