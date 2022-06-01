import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_URL} from "../../constants/api";
import {connect} from "react-redux";
import mapStateToProps from "../../constants/mapStateToProps";
import mapDispatchToProps from "../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../constants/areStatePropsEqual";
import {useNavigate} from "react-router-dom";

const User = ({id, token, user}) => {

    const [userShow, setUserShow] = useState(null);
    const navigate = useNavigate()
    const [likes, setLikes] = useState([])


    useEffect(() => {
        axios.get(API_URL + `api/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setUserShow(response.data.user)
            console.log(response.data.user)
            console.log(response.data.user.posts)
        })
            .catch(error => console.log(error))
    }, [likes])

    function handleClickPostLiked(post_id) {
        axios.post(API_URL + 'api/admin/like', {post_id}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data.post[0].post_user_liked)
            setLikes(response.data.post[0].post_user_liked)
        })
    }

    return (
        <div className="User">
            <div>
                <div className='topNav'>
                    <button onClick={() => navigate('/')}>
                        <i className='fas fa-home'></i>
                    </button>
                    <h1>{userShow && userShow.name}</h1>
                </div>
                <div className='Posts'>
                    <div className='div2'>
                        <div>
                            {
                                userShow && userShow.posts.sort((a, b) => b.id - a.id).map((post, index) => {
                                    return (
                                        <div key={index} className='post'>
                                            <h1>{post.name}</h1>
                                            <img src={`${API_URL}storage/${post.image}`} width='400px' alt=''/>
                                            <h2>{post.subject}</h2>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {areStatePropsEqual: areStatePropsEqual}
)(User);