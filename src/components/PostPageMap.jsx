import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocialMediaContext } from './Contex';
import PM from '../Images/man.jpg'
import PW from '../Images/woman.jpg'
import { FaTrashAlt, FaRegHandScissors } from "react-icons/fa";
import { FcLike, FcDislike } from "react-icons/fc";
import { FcInternal } from "react-icons/fc";



class PostPageMap extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comments: "",
         }
    }
    static contextType = SocialMediaContext;

    
    commentOnchangeHandler = (e) => {
        this.setState({
            comments: e.target.value
        })
    }

    WriteComments = (e , _id) =>{
        e.preventDefault();
        this.context.WritecommentCALL(_id, this.state.comments, this.context.id )
        this.setState({
            comments: ""
        })
    }

    render() { 

        const { user, _id , picture , caption , date} = this.props.item
        return ( 
            <div>
                    <div key={_id} className="postpage">
                        {user.ProfilePic === undefined && this.context.datiPersonali.sesso === "Man" ?
                            <img src={PM} alt={this.context.User_Name} className="postpage_profileImage" />
                            : ""}
                        {user.ProfilePic === undefined && this.context.datiPersonali.sesso === "Woman" ?
                            <img src={PW} alt={this.context.User_Name} className="postpage_profileImage" />
                            : ""}
                        {user.ProfilePic !== undefined ?
                            <img src={user.ProfilePic} alt={this.context.User_Name} className="postpage_profileImage" />
                            : ""}

                        <h3 className="postpage_name">{user.name}</h3>
                        <p className="postpage_date">date: {date.toString(2)}</p>

                        {user._id === this.context.id ?
                            <FaTrashAlt className="postpage_trash" onClick={() => this.context.DeletePostCALL(_id , this.context.id)} /> : ""}
                        <div className="postpage_LikeDislike" >
                            <FcLike />
                            <FcDislike />
                        </div><br />
                        {picture !== undefined ? <img src={picture} alt={caption} className="postpage_Image" /> : ""}

                        <h4 className="postpage_Caption">{caption}</h4>
                        <form onSubmit={(e) => this.WriteComments(e,_id)}>
                            <span className="postpage_CommentInput">
                                <input type="text" name="" className="postpageComments" placeholder=" Write Your Commnet" onChange={this.commentOnchangeHandler} value={this.state.comments}/>
                                <FcInternal className="FC_ICONS" style={{ fontSize: "2rem" }}
                                    onClick={() => this.context.WriteCommentCALL(_id, this.state.comments, this.context.id )} />
                            </span>
                        </form>
                        <h4 className="postpage_Comment">comments:</h4>

                        {this.context.comments.map(com =>
                            <div key={com._id}>
                                {_id === com.postref._id ?
                                    <div className="postpage_Comment_detail">
                                        <span>
                                            <img src={com.user.ProfilePic} alt={com.user.name} />
                                            <h5>{com.user.name}</h5>
                                        </span>
                                        <h4>{com.comment} {com.user._id === this.context.id || this.context.id === user._id ?
                                            <FaTrashAlt className="postpage_Comment_trash" onClick={() => this.context.DeleteCommentCALL(com._id, com.postref._id )} />
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
}
 
export default PostPageMap;