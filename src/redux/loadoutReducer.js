const initialState = {
    loadouts: []
}

const GET_LOADOUTS = 'GET_LOADOUTS'

export function getLoadouts(loadoutsObj){
    console.log('we are')
    return {
        type: GET_LOADOUTS,
        payload: loadoutsObj
    }
}


export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_LOADOUTS:
            return {...state, loaoduts: payload}
            //{user: {}, user: {user_id: 1, user_email: 'email'}}
        default:
            return state;
    }
};