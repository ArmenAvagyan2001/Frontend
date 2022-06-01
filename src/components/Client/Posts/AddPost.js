import {connect} from "react-redux";
import mapStateToProps from "../../../constants/mapStateToProps";
import mapDispatchToProps from "../../../constants/mapDispatchToProps";
import areStatePropsEqual from "../../../constants/areStatePropsEqual";
import {useState} from "react";
import PopupAddPost from "./PopupAddPost";

const AddPost = () => {
    const [active, setActive] = useState(false);

    return (
        <div className='AddPost'>
            <div>
                <button onClick={() => setActive(true)}>+add new post</button>
                <PopupAddPost active={active} setActive={setActive} />
            </div>
        </div>
    )
 }

 export  default connect(
     mapStateToProps,
     mapDispatchToProps,
     null,
     {areStatePropsEqual: areStatePropsEqual}
 )(AddPost)