import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import './listingSpots.css';

export function ListingSpots() {
    const dispatch = useDispatch();
    
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj.allSpots);
    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);
    
    return (
        <div className='spots-container'>
            {spots?.length > 0 && spots.map(spot => (
                <Link to={`/spots/${spot.id}`}>
                    <div key={spot.id} className='spot-card'>
                        <div>
                            <img src={spot.previewImage} alt='spot' className='spot-image' />
                        </div>
                        <div className='spot-name-row'>
                            <div className='spot-name'>{spot.name}</div>
                            <div>
                            <i className="fa-solid fa-star"></i>{spot.avgRating ? spot.avgRating : 0}
                            </div>
                        </div>
                        <div>
                            <div>{spot.city}, {spot.state}</div>
                        </div>
                        <div>
                            ${spot.price}
                        </div>
                    </div>
                </Link>
            ) )}
        </div>
    )
}
