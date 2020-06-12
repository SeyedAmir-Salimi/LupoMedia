import React, { useContext } from 'react'
import { SocialMediaContext } from './Context';
import { FaTrashAlt } from "react-icons/fa";


const CommentsPageMap = ({item}) => {
    const {id , DeleteCommentCALL } = useContext(SocialMediaContext)

    return ( 
        <div key={item._id}>
        <div className="postpage_Comment_detail">
            <span>
                <img src={item.user.ProfilePic} alt={item.user.name} />
                <h5>{item.user.name}</h5>
            </span>
            <h4>{item.comment} {item.user._id === id || id === item.user._id ?
                <FaTrashAlt className="postpage_Comment_trash" onClick={() => DeleteCommentCALL(item._id, item.postref._id)} />
                : ""}
            </h4>
        </div>
    </div>
     );
}
 
export default CommentsPageMap;