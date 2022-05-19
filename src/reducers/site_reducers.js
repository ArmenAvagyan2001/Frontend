import {ADD_POST, DELETE_POST, DELETE_TOKEN, DELETE_USER, SET_POSTS, SET_TOKEN, SET_USERS} from "../actions/types";

const initialState = {
    token: null,
    user: {},
    users: [],
    posts: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token,
                user: action.user
            }
        case DELETE_TOKEN:
            return {
                token: null,
                user: {},
                users: [],
                posts: []
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => {
                    return post.id !== action.id
                })
            }
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.post
                ]
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            }
        default:
            return state;
    }
}
