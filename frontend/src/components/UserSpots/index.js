import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spots';
import { UpdateSpotForm } from './UpdateSpot';
import UpdateSpotModal from './UpdateSpotModal';
import { Modal } from '../../context/Modal';

export function UserSpots() {
    const sessionUser = useSelector((state) => state.session.user); 
    const dispatch = useDispatch();
    const spotsObj= useSelector(state => state.spots);
    const spots = Object.values(spotsObj.allSpots);
    const [showModal, setShowModal] = useState(false);

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
        <div>
            {sessionUser && 
                <div>
                    {spots.length > 0 && spots.map(spot => 
                        <div key={spot.id}>
                            <div>
                                {spot.name}
                            </div>
                            <div>           
                                <div>
                                    <UpdateSpotModal spot={spot} />
                                </div>
                                <button>Delete</button>
                            </div>
                        </div>)}
                </div>
            }
        </div>
    )
    
}
