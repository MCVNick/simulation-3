const initialState = {
    username: '',
    id: 0,
    profile_pic: ''
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_USER:
            const { username, id, profile_pic } = payload
            return {...state, id, username, profile_pic}
        default:
            return state;
    }
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(userObj) {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}