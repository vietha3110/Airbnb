import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spots';
export function UserSpots() {
    const sessionUser = useSelector((state) => state.session.user); 
    const dispatch = useDispatch();
    const spotsObj= useSelector(state => state.spots.Spots);
    // const spots = Object.values(spotsObj);
    console.log(`what is it`, spotsObj)

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

    return (
        <div>
            {sessionUser && 
                <div>
                    All Spots here
                </div>
            }
        </div>
    )
    
}
