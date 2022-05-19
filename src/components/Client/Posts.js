import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../constants/api";
import {connect} from "react-redux";
import mapStateToProps from "../../constants/mapStateToProps";
import mapDispatchToProps from "../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../constants/areStatePropsEqual";
import AddPost from "./AddPost";

const Posts = ({user, token, setPosts, posts, deletePost}) => {

    const [value, setValue] = useState(false);

    useEffect(() => {
        axios.get(API_URL + `api/posts/${user.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => setPosts(response.data.posts))
            .catch(error => console.log(error))
    }, [])

    const handleClickDeletePost = id => {
        axios.delete(API_URL + `api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => deletePost(id))
            .catch(error => console.log(error))
    }

    return (
        <div className='Posts' onClick={() => setValue(false)}>
            <div className='div2'>
                <div>
                    {
                        posts.map((post, index) => {
                            return (
                                <div key={index} className='post'>
                                    <h1>{post.name}</h1>
                                    <img src={`${API_URL}storage/${post.image}`} width='400px'/>
                                    <h2>{post.subject}</h2>
                                    <button className='button'
                                            onClick={e =>{
                                                e.stopPropagation()
                                                setValue(true)
                                            } }
                                    >
                                        <i className='fas fa-ellipsis-v'></i>
                                    </button>
                                    {
                                        value ?
                                            <div className='postSettings'>
                                                <div>
                                                    <button
                                                        onClick={() => handleClickDeletePost(post.id)}
                                                    >delete
                                                    </button>
                                                    <button>change</button>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }

                                </div>
                            )
                        })
                    }
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