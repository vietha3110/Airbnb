import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spots';
export function UserSpots() {
    const sessionUser = useSelector((state) => state.session.user); 
    const dispatch = useDispatch();
    const spotsObj= useSelector(state => state.spots);
    const spots = Object.values(spotsObj.allSpots);

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

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
                                <button>Update</button>
                                <button>Delete</button>
                            </div>
                        </div>)}
                </div>
            }
        </div>
    )
    
}
