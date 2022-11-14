import { csrfFetch } from './csrf';

const LOGIN = 'session/login';
const LOGOUT = 'session/logout'

export function login(user) {
    return {
        type: LOGIN,
        payload: user
    }
}

export function logout(user) {
    return {
        type: LOGOUT
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
    dispatch(login(data.user));
    return response;
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(login(data.user));
    return response;
};

export const signup = (user) => async dispatch => {
    const { firstName, lastName, password, username, email } = user;
    const response = await csrfFetch(`/api/users`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({firstName, lastName, password, username, email})
    });
    const data = await response.json();
    dispatch(login(data.user));
    return response;
}

export const userLogout = () => async dispatch => {
    const response = await csrfFetch(`/api/session`, {
        method: 'DELETE',
    });
    dispatch(logout());
    return response;
}

const initialState = {user: null}

export default function sessionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOGIN:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case LOGOUT: 
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}
