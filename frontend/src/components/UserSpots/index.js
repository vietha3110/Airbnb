import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spots';
import UpdateSpotModal from './UpdateSpotModal';
import DeleteSpotModal from './DeleteSpotModal';
import { Link } from 'react-router-dom';
import './index.css'


export function UserSpots() {
    const sessionUser = useSelector((state) => state.session.user); 
    const dispatch = useDispatch();
    const spotsObj= useSelector(state => state.spots);
    const spots = Object.values(spotsObj.allSpots);

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])
    // const handleUpdateButton = (e) => {
    //     e.stopProgation();
    //     return (
    //       <UpdateSpotForm/>
    //     )

    // }

    return (
        <div className='managespot-main'>
            <div>
                <h2>Welcome, {sessionUser.firstName}! </h2>
            </div>
            {sessionUser && 
                <div className='managespot-page'>
                    {spots.length > 0 && spots.map(spot => 
                        <div key={spot.id} className='managespot-container'>
                            <div className='managespot-name'>
                                <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
                            </div>
                            <div className='managespot-change'>           
                                <div className='update'>
                                    <UpdateSpotModal spot={spot} />
                                </div>
                                <div className='delete'>
                                    <DeleteSpotModal spot={spot}/>
                                </div>
                            </div>
                        </div>)}
                </div>
            }
        </div>
    )
    
}
