import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneSpot } from "../../store/spots";
import { useEffect } from "react";
import * as reviewsAction from '../../store/reviews';
import ReviewSpotModal from "../Reviews/ReviewForm/ReviewFormModal";
import DeleteReviewModal from "../Reviews/DeleteReviewModal";

import './ListingSpotDetail.css';
export function SpotDetail() {
    const { spotId } = useParams(); 
    const dispatch = useDispatch();
    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
    const reviewObj = useSelector(state => state.reviews);
    const spotReviews = Object.values(reviewObj.spot);
    // console.log(spotReviews);
    let sum = 0;
    let avgRating = 0;
    
    for (let review of spotReviews) {
        sum += review.stars;
    }
    if (sum > 0) {
        avgRating = (sum / spotReviews.length).toFixed(2);
    }
   
    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(fetchOneSpot(spotId));
        dispatch(reviewsAction.fetchSpotReviews(spotId))
    }, [dispatch, spotId]);
    
  

    if (spot && spot.statusCode) return (
        <div className="not-found">
            <h2>
            Sorry, spot couldnt be found
            </h2>
        </div>
    );
    return (
        <div className="spot-container">
            <div className="spot-info">
                <h2>{spot.name}</h2>
                <div>
                    <i className="fa-solid fa-star"></i>
                    {avgRating}, {spotReviews.length} reviews, {spot.city}, {spot.state}, {spot.country}
                </div>
            </div>       
            <div className="spot-photo">
                 {spot.SpotImages?.length > 0 &&
                    <div className="spot-photo-container photo-one">
                        <img src={spot.SpotImages[0].url} alt='spot'/>
                    </div>
 
                } 
                <div className="spot-photo-container photo-four">
                    <div>
                        <img src='https://images.pexels.com/photos/7512041/pexels-photo-7512041.jpeg' alt='spot'/>
                    </div>
                    <div>
                        <img src='https://images.pexels.com/photos/1879061/pexels-photo-1879061.jpeg' alt='spot' className="photo-border1"/>
                    </div>
                    <div>
                        <img src='https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg' alt='spot'/>
                    </div>
                    <div>
                        <img src='https://images.pexels.com/photos/7598127/pexels-photo-7598127.jpeg' alt='spot'className="photo-border2"/>
                    </div>
                </div>
            </div>
            <div className="spot-detail-container">
                <div className="spot-host">
                    {spot.Owner && 
                        <div className="host-name">
                            <h2>This place hosted by {spot.Owner.firstName}</h2>
                        </div>
                    }
                    <div>
                        <img src="https://i.pinimg.com/originals/f9/57/2b/f9572b297b1b28af9b901ca157dcbec2.jpg" alt='brown' className="profile-photo"/>
                    </div>
                    <div>
                        ${spot.price}
                    </div>
                </div>
                <div className="spot-mockup">
                    <div className="mockup-item">
                        <i className="fa-solid fa-check"></i> Self Checkin
                    </div>
                    <div className="mockup-item">
                        <i className="fa-solid fa-location-pin"></i> Great Location
                    </div>
                    <div className="mockup-item">
                    <i className="fa-solid fa-calendar"></i> Free cancellation for 48hours.
                    </div>
                </div>
                <div className="spot-mockup">
                    <div>
                        <h2>WHAT WE COVER</h2>
                    </div>
                    <div className="mockup-para">
                        <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                        </p>
                    </div>
                </div>
                <div className="spot-desc">
                    <div className="spot-h2">
                        <h2>About this spot</h2>
                    </div>
                    <div className="spot-desc-detail">
                        <p>
                            {spot.description}
                        </p>
                    </div>
                </div>
                <div className="spot-review">
                    <div className="reviews-container">
                        <p style={{fontWeight:700, fontSize:20}}> <i className="fa-solid fa-star" style={{fontSize:17}}></i>{avgRating} - {spotReviews.length} reviews</p>
                        <div className="reviews-cards">
                            {spotReviews?.length > 0 && spotReviews.map(review => (
                                <div key={review.id} className='review-user-container'>
                                    <div className="reviewer-info">
                                        
                                        <div className="review-user-photo">
                                            <img src='https://static.wikia.nocookie.net/line/images/1/10/2015-cony.png' alt='cony' className="user-profile"/>
                                        </div>
                                        <div className="review-name">{review.User.firstName}</div>
                                    </div>
                                    <div className="review-description">{review.review}</div>
                                    <div className="review-delete">
                                        {sessionUser && +review.userId === sessionUser.id && 
                                            <DeleteReviewModal reviewId={review.id} spotId={spot.id} />
                                        }
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="btn-newreview">
                            <ReviewSpotModal spotId={spot.id} />
                        </div>
                           
                        </div>
                </div>
            </div>
        </div>
    )
}
