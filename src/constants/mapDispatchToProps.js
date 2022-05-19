import {addPost, deletePost, deleteToken, setPosts, setToken, setUsers, deleteUser} from "../actions/site";

export default (dispatch) => {
    return {
        setToken: (token, user) => dispatch(setToken(token, user)),
        deleteToken:() => dispatch(deleteToken()),
        setPosts: posts => dispatch(setPosts(posts)),
        deletePost: id => dispatch(deletePost(id)),
        addPost: post => dispatch(addPost(post)),
        setUsers: user => dispatch(setUsers(user)),
        deleteUser: id => dispatch(deleteUser(id)),
    }
}