import React, { useReducer } from 'react';
import postDataReducer from '../reducers/postData';
import {
    CHANGE,
} from "../actions/postData";

const usePostData = ( startingConfig ) => {

    const [{
        title,
        description,
        username,
    }, dispatch] = useReducer(postDataReducer, {
        title: startingConfig.title,
        description: startingConfig.description,
        username: startingConfig.username,
    });

    const changePostData = (change) => {
        dispatch({
            type: CHANGE,
            change: change,
        });
    };
    const propsLocal = {
        title: title,
        description: description,
        username: username,
        changePostData: changePostData,
    };
    return propsLocal;
};

export default usePostData;