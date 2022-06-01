import {API_URL} from "../../../constants/api";
import {useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import mapStateToProps from "../../../constants/mapStateToProps";
import mapDispatchToProps from "../../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../../constants/areStatePropsEqual";

function PopupChangePost({active, setActive, post, token, name, setName, subject, setSubject}) {

    const [file, setFile] = useState();


    const handleClickClosePopup = () => {
        setActive(false)
        setTimeout(() => {
            setName('');
            setSubject('');
            setFile(null)
        }, 500)
    }

    const handleClickChangePost = () => {

        const FData = new FormData();
        FData.append('image', file);
        const data = file ?
            {
                name,
                subject,
                image: FData.get('image')
            }
            :
            {
                name,
                subject
            }
        axios.put(API_URL + `api/client/posts/${post.id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data, application/json'
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error.response))
    }

    return (
        <div className={active ? "modal_change_post active" : "modal_change_post"} onClick={handleClickClosePopup}>
            <div className={active ? "modal_change_post_content active" : "modal_change_post_content"}
                 onClick={e => e.stopPropagation()}>
                <div>
                    <label htmlFor="changeName">Name</label><br/>
                    <input id='changeName'
                           type="text"
                           value={name}
                           onChange={e => setName(e.target.value)}
                    /><br/><br/><br/>
                    <label htmlFor="changeSubject">Subject</label><br/>
                    <input id='changeSubject'
                           type="text"
                           value={subject}
                           onChange={e => setSubject(e.target.value)}
                    /><br/><br/><br/>
                    <label htmlFor="changeFile">
                        <img src={file ? URL.createObjectURL(file) : API_URL + 'storage' + post.image} />
                    </label>
                    <input id='changeFile' type="file" onChange={e => setFile(e.target.files[0])}/><br/><br/>
                    <button
                        onClick={handleClickChangePost}
                    >change post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {areStatePropsEqual: areStatePropsEqual}
)(PopupChangePost)