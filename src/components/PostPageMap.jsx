import React, { useState , useContext} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocialMediaContext } from './Context';
import PM from '../Images/man.jpg'
import PW from '../Images/woman.jpg'
import { FaTrashAlt  } from "react-icons/fa";
import { FcLike, FcDislike } from "react-icons/fc";
import { FcInternal } from "react-icons/fc";
import CommentsPageMap from "./CommentsPageMap"

const PostPageMap = ({item}) => {
    const [comment, setcomment] = useState("")
    const {datiPersonali , User_Name , id , comments , WritecommentCALL , DeleteCommentCALL , DeletePostCALL} = useContext(SocialMediaContext)
    const onchangHandler = (e) =>{setcomment(e.target.value)} 
    
    const WriteComments = (e,ref, comments, users) =>{
        e.preventDefault();
        WritecommentCALL(ref, comments, users)
        setcomment("")
    }

    return (
        <div>
            <div key={item._id} className="postpage">
                {item.user.ProfilePic === undefined && datiPersonali.sesso === "Man" ?
                    <img src={PM} alt={User_Name} className="postpage_profileImage" />
                    : ""}
                {item.user.ProfilePic === undefined && datiPersonali.sesso === "Woman" ?
                    <img src={PW} alt={User_Name} className="postpage_profileImage" />
                    : ""}
                {item.user.ProfilePic !== undefined ?
                    <img src={item.user.ProfilePic} alt={User_Name} className="postpage_profileImage" />
                    : ""}

                <h3 className="postpage_name">{item.user.name}</h3>
                <p className="postpage_date">date: {item.date.toString(2)}</p>

                {item.user._id === id ?
                    <FaTrashAlt className="postpage_trash" onClick={() => DeletePostCALL(item._id, id)} /> : ""}
                <div className="postpage_LikeDislike" >
                    <FcLike />
                    <FcDislike />
                </div><br />
                {item.picture !== undefined ? <img src={item.picture} alt={item.caption} className="postpage_Image" /> : ""}

                <h4 className="postpage_Caption">{item.caption}</h4>
                <form onSubmit={(e) => WriteComments(e, item._id , comment , id)}>
                    <span className="postpage_CommentInput">
                        <input type="text" name="" className="postpageComments" placeholder=" Write Your Commnet" onChange={onchangHandler} value={comment} />
                        <FcInternal className="FC_ICONS" style={{ fontSize: "2rem" }}
                            onClick={(e) => WriteComments(e, item._id, comment, id)} />
                    </span>
                </form>
                <h4 className="postpage_Comment">comments:</h4>

                {comments.map(com =>
                    <div key={com._id}>
                        {item._id === com.postref._id ?
                            <div className="postpage_Comment_detail">
                                <span>
                                    <img src={com.user.ProfilePic} alt={com.user.name} />
                                    <h5>{com.user.name}</h5>
                                </span>
                                <h4>{com.comment} {com.user._id === id || id === item.user._id ?
                                    <FaTrashAlt className="postpage_Comment_trash" onClick={() => DeleteCommentCALL(com._id, com.postref._id)} />
                                    : ""}
                                </h4>
                            </div>
                            : ""}
                    </div>
                )}

            </div>
        </div>
    );
}

export default PostPageMap;