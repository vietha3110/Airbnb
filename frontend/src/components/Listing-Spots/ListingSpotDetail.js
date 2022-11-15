import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneSpot } from "../../store/spots";
import { useEffect } from "react";

export function SpotDetail() {
    const { spotId } = useParams(); 
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots);
    
    useEffect(() => {
            dispatch(fetchOneSpot(spotId));
    },[dispatch]);

    return (
        <div>
            <div>Spot Name: {spot.name}</div>
            <div>Spot rating, Spot review, Spot City, Spot State, Spot Country</div>
            <div>Photos here</div>
            <div>Mockup name, guest, room... Profile User photo</div>
            <div>Self checkin, location...</div>
            <div>Mock up booking card</div>
            <div>Spot description</div>
            <div>Mock up what this place offer</div>
            <div>calendar mockup</div>
            <div>review here
                <div>total reviews</div>
                <div>
                    <div>review???</div>
                </div>
            </div>
            <div>User info
                <div>
                    <div>total review</div>
                    <div>Identify verified- mockup</div>
                </div>
                <div>some info mockup here</div>
                <div> button contact host</div>
            </div>
            <div>Thing to know</div>
        </div>
    )
}
