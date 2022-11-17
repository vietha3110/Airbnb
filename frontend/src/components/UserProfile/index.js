import * as userReviewsAction from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export function UserProfile() {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.userReviews);
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return (
        <div>
            Please login to see this page!
        </div>
    )

    useEffect(() => {
        dispatch(userReviewsAction.loadUserReviews());
    })

    return (
        <div>
            <div>User Info</div>
            <div>
                <h2>All Reviews</h2>
                <div>Review by you</div>

            </div>
        </div>
    )
}
