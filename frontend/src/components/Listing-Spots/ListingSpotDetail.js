import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneSpot } from "../../store/spots";
import { useEffect } from "react";

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
                    <div>
                        <img src={spot.SpotImages[0].url} alt='spot'style={{width: 600, height: 500}}/>
                    </div>
                } 
            </div>
            <div className="spot-detail-container">
                <div className="spot-host">
                    {spot.Owner && 
                        <div>
                            Hosted by {spot.Owner.firstName}
                        </div>
                    }
                    <div>
                        Profile photo
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
