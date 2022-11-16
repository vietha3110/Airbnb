import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneSpot } from "../../store/spots";
import { useEffect } from "react";
import './ListingSpotDetail.css';
export function SpotDetail() {
    const { spotId } = useParams(); 
    const dispatch = useDispatch();
    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;

    useEffect(() => {
        dispatch(fetchOneSpot(spotId));
    },[dispatch, spotId]);

    if (spot && spot.statusCode) return (
        <div>Sorry, spot couldnt be found</div>
    );
    return (
        <div className="spot-container">
            <div className="spot-info">
                <h2>{spot.name}</h2>
                <div>{spot.avgStarRating}, {spot.city}, {spot.state}, {spot.country}</div>
            </div>       
            <div className="spot-photo">
                 {spot.SpotImages?.length > 0 &&
                    <div className="spot-photo-container photo-one">
                        <img src={spot.SpotImages[0].url} alt='spot'className="spot-imagee"/>
                    </div>
                    
                } 
                <div className="spot-photo-container photo-four">
                    <div>
                        <img src='https://images.pexels.com/photos/7512041/pexels-photo-7512041.jpeg' alt='spot'className="spot-photos"/>
                    </div>
                    <div>
                        <img src='https://images.pexels.com/photos/1879061/pexels-photo-1879061.jpeg' alt='spot'className="spot-photos"/>
                    </div>
                    <div>
                        <img src='https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg' alt='spot'className="spot-photos"/>
                    </div>
                    <div>
                        <img src='https://images.pexels.com/photos/7598127/pexels-photo-7598127.jpeg' alt='spot'className="spot-photos"/>
                    </div>
                </div>
            </div>
            <div className="spot-detail-container">
                <div className="spot-host">
                    {spot.Owner && 
                        <div className="host-name">
                            <h2>Hosted by {spot.Owner.firstName}</h2>
                        </div>
                    }
                    <div>
                        <img src="https://i.pinimg.com/originals/f9/57/2b/f9572b297b1b28af9b901ca157dcbec2.jpg" alt='brown' className="profile-photo"/>
                    </div>
                </div>
                <div className="spot-mockup">
                    <div>
                        Self check-in
                    </div>
                    <div>
                        Great Location
                    </div>
                    <div>
                        Free cancellation for 48hours.
                    </div>
                </div>
                <div className="spot-mockup">
                    <div>
                        HaAibnb Cover
                    </div>
                    <div>
                        <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                        </p>
                    </div>
                </div>
                <div className="spot-desc">
                    <p>
                        {spot.description}
                    </p>
                </div>
                
                <div className="spot-review">
                    <div>total reviews</div>
                    <div>
                        <div>review???</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
