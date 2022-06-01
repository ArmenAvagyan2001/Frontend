import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../../constants/api";
import {connect} from "react-redux";
import mapStateToProps from "../../../constants/mapStateToProps";
import mapDispatchToProps from "../../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../../constants/areStatePropsEqual";
import PopupChangePost from "./PopupChangePost";

const Posts = ( { token, setPosts, posts, deletePost, user } ) => {

    const [active, setActive] = useState(false),
        [postData, setPostData] = useState(),
        [name, setName] = useState(''),
        [subject, setSubject] = useState(''),
        [likes, setLikes] = useState([])

    useEffect(() => {
        axios.get(API_URL + `api/client/posts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data.posts)
            setPosts(response.data.posts)
        }).catch(error => console.log(error))
    }, [likes])

    const handleClickDeletePost = id => {
        axios.delete(API_URL + `api/client/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => deletePost(id))
            .catch(error => console.log(error))
    }

    const handleClickChangePost = id => {
        const post = posts.find(post => post.id === id);
        setPostData(post)
        setName(post.name);
        setSubject(post.subject)
        setActive(true)
    }

    function handleClickPostLiked(post_id) {
        axios.post(API_URL + 'api/client/like', {post_id}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => setLikes(response))
    }

    return (
        <div className='Posts'>
            <div className='div2'>
                <div>
                    {
                        posts.sort((a, b) => b.id - a.id).map((post, index) => {
                            return (
                                <div key={index} className='post'>
                                    <h1>{post.name}</h1>
                                    <img src={`${API_URL}storage/${post.image}`} width='400px' alt=''/>
                                    <h2>{post.subject}</h2>
                                    <button className='delete'
                                            onClick={e => handleClickDeletePost(post.id)}
                                    >
                                        <i className='fas fa-trash-alt'></i>
                                    </button>
                                    <button className='change'
                                            onClick={e => handleClickChangePost(post.id)}
                                    >
                                        <i className='fas fa-pencil-alt'></i>
                                    </button>
                                    <div>
                                        {
                                            post.post_user_liked.find(like => like.id === user.id) ?
                                                <button onClick={() => handleClickPostLiked(post.id)}>
                                                    <i className='fas fa-heart'></i>
                                                </button>
                                                :
                                                <button onClick={() => handleClickPostLiked(post.id)}>
                                                    <i className='far fa-heart'></i>
                                                </button>
                                        }
                                        <small>{post.post_user_liked.length}</small>
                                    </div>
                                </div>
                            )
                        })
                    }
                    { postData && <PopupChangePost active={active} setActive={setActive} name={name} setName={setName} subject={subject} setSubject={setSubject} post={postData}/>}
                </div>
            </div>
        </div>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {areStatePropsEqual: areStatePropsEqual}
)(Posts);