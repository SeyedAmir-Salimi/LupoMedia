import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocialMediaContext } from './Contex';
import PM from '../Images/man.jpg'
import PW from '../Images/woman.jpg'
import { FaTrashAlt } from "react-icons/fa";
import { FcLike, FcDislike } from "react-icons/fc";
import { FcInternal } from "react-icons/fc";

class CommentsPageMap extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static contextType = SocialMediaContext;

    render() {

        const { _id, postref, user, comment } = this.props.com
        return (
            <div key={_id}>
                <div className="postpage_Comment_detail">
                    <span>
                        <img src={user.ProfilePic} alt={user.name} />
                        <h5>{user.name}</h5>
                    </span>
                    <h4>{comment} {user._id === this.context.id || this.context.id === user._id ?
                        <FaTrashAlt className="postpage_Comment_trash" onClick={() => this.context.DeleteCommentCALL(_id, postref._id)} />
                        : ""}
                    </h4>
                </div>


            </div>
        );
    }
}

export default CommentsPageMap;