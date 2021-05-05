import {
    CHANGE,
} from "../actions/postData";

const postDataReducer = (state, action) => {
    switch (action.type) {
        case CHANGE: {
            //Could do more here
            const { change } = action;
            return {
                ...state,
                [change.target.name]: change.target.value,
            };
        }
        default:
            return state;
    }
}

export default postDataReducer;