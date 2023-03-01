import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import SpotHead from './SpotHead';
import './listingSpots.css';

export function FilterSpotsPage() {
    const dispatch = useDispatch();
    
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj.allSpots);
    
    return (
        <>  
            <div className='spothead-container'>
                <SpotHead dispatch={dispatch} />
            </div>
            <div className={spots?.length > 0 ? "spots-container" : "no-spots-container"}>
            {   spots?.length > 0 && spots.map(spot => (
                    <Link to={`/spots/${spot.id}`}>
                        <div key={spot.id} className='spot-card'>
                            <div className='spot-image'>
                                <img src={spot.previewImage} alt='spot'/>
                            </div>
                            <div className='spot-name-row'>
                                <div className='spot-name'>{spot.city}, {spot.state}</div>
                                <div style={{fontSize:14}}>
                                <i className="fa-solid fa-star"></i>{spot.avgRating ? spot.avgRating : 0}
                                </div>
                            </div>
                            <div className='spot-name-info'>
                                <div style={{fontSize:13}}>Recently added</div>
                            </div>
                            <div className='spot-name-info' style={{fontWeight:700}}>
                                ${spot.price} <span style={{fontWeight:300}}>night</span>
                            </div>
                        </div>
                    </Link>
            ))}
                {
                    spots.length === 0 && 
                    <div className='no-spots'>
                        <p className='no-spots-para1'>
                            Sorry, we don't have any spots available at that price.
                        </p>
                        <p className='no-spots-para2'>
                            Can we help you find something else or would you like to <Link to="/"> go back </Link>to the homepage?
                        </p>
                    </div>
                }
            </div>
        </>
    )
}
