import { csrfFetch } from './csrf';

const LOGIN = 'session/login';

export function login(user) {
    return {
        type: LOGIN,
        payload: user
    }
}

export const userLogin = (user) => async (dispatch) => {
    const response = await csrfFetch(`/api/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    dispatch(login(data));
    return response
}

const initialState = {user: null}

export default function sessionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOGIN:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        default:
            return state;
    }
}
