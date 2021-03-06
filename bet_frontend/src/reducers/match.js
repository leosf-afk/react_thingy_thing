import {GET_MATCHES} from "../actions/types"

const initialState = {
    isFetching: true,
    matches: [],
}

const matches = (state=initialState, action) => {
    switch(action.type){
        case GET_MATCHES:
            return action.payload;
        default:
            return state;
    }
};

export default matches;

