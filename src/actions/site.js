import {ADD_POST, DELETE_POST, DELETE_TOKEN, SET_POSTS, SET_TOKEN, SET_USERS, DELETE_USER, SET_USER_ID} from "./types";

export const setToken = (token, user) => dispatch => {
    dispatch({
        type: SET_TOKEN,
        token,
        user
    })
};

export const deleteToken = () => dispatch => {
    dispatch({
        type: DELETE_TOKEN,
    })
};

export const setPosts = posts => dispatch => {
    dispatch({
        type: SET_POSTS,
        posts
    })
};

export const deletePost = id => dispatch => {
    dispatch({
        type: DELETE_POST,
        id
    })
};

export const addPost = post => dispatch => {
    dispatch({
        type: ADD_POST,
        post
    })
};

export const setUsers = users => dispatch => {
    dispatch({
        type: SET_USERS,
        users
    })
};

export const deleteUser = id => dispatch => {
    dispatch({
        type: DELETE_USER,
        id
    })
};

export const setUserId = id => dispatch => {
    dispatch({
        type: SET_USER_ID,
        id
    })
};