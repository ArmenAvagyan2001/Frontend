import {useState} from "react";
import axios from "axios";
import {API_URL} from "../../../constants/api";
import {connect} from "react-redux";
import mapStateToProps from "../../../constants/mapStateToProps";
import mapDispatchToProps from "../../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../../constants/areStatePropsEqual";

function PopupAddPost ( { active,  setActive, token, addPost } ) {
    const [image, setImage] = useState(),
        [name, setName] = useState(''),
        [subject, setSubject] = useState('')


    const handleClickClosePopup = () => {
        setActive(false)
        setTimeout(() => {
            setImage(null);
            setName('');
            setSubject('');
        }, 500)
    }

    const handleClickAddPost = () => {

        const FData = new FormData()
        FData.append('image', image)

        const data = {
            name,
            subject,
            image: FData.get('image')
        }

        axios.post(API_URL + `api/client/posts`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            addPost(response.data.post)
            handleClickClosePopup()
        }).catch(error => console.log(error))
    }
    return (
        <div className={active ? "modal_add_post active" : "modal_add_post"} onClick={handleClickClosePopup}>
            <div className={active ? "modal_content_add_post active" : "modal_content_add_post"} onClick={e => e.stopPropagation()}>
                <div>
                    <label htmlFor="name">Name</label><br/>
                    <input id='name'
                           type="text"
                           placeholder='Post name'
                           autoComplete='off'
                           value={name}
                           onChange={e => setName(e.target.value)}
                    /><br/><br/><br/>
                    <label htmlFor="subject">Subject</label><br/>
                    <input id='subject'
                           type="text"
                           placeholder='Post subject'
                           autoComplete='off'
                           value={subject}
                           onChange={e => setSubject(e.target.value)}
                    /><br/><br/><br/>
                    <label htmlFor="file">
                        {image ?
                            <img src={ image ? URL.createObjectURL(image) : ''}/>
                            :
                            <div className='button'>+Photo</div>
                        }
                    </label><br/>
                    <input id='file' type="file" onChange={e => setImage(e.target.files[0])}/><br/><br/><br/>
                    <button onClick={handleClickAddPost}>Add new post</button>
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
 )(PopupAddPost)