import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocialMediaContext } from './Contex';
import { FcCamera, FcInternal } from "react-icons/fc";
import Axios from 'axios'


class PostInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PostCaption: "",
        }
    }
    static contextType = SocialMediaContext;

    triggerInputFile = () => {
        this.fileInput.click()
    }
    
    WritePost = (e) =>{
        e.preventDefault();
        this.context.AddPostCall(this.context.id , this.state.PostCaption);
        this.setState({
            PostCaption: ""
        })
    }

    render() {
        const NAME = this.context.User_Name
        return (
            <div>
                <div>
                    <form onSubmit={this.WritePost} className="PostInput" disabled={this.state.PostCaption === ""}>
                        <input type="text" name="PostCaption" id="" placeholder={"What Do You Think " + NAME + "..."} value={this.state.PostCaption} onChange={(e) => this.setState({ PostCaption: e.target.value })} />
                        <FcCamera onClick={this.triggerInputFile} className="FC_ICONS" />
                        <FcInternal className="FC_ICONS" onClick={this.WritePost} />
                    </form>

                </div>
                <input ref={fileInput => this.fileInput = fileInput} type="file" name="PostPic" id="PO_Pic" style={{ visibility: "hidden" }} />
            </div>
        );
    }
}

export default PostInput;

