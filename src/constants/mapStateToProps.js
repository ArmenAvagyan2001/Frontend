/**
 *
 * @param state
 * @returns {{}}
 */
export default (state) => {
    return {
        token: state.items.token,
        user: state.items.user,
        users:state.items.users,
        posts: state.items.posts,
        id: state.items.id
    }
}