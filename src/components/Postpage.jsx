import React, { Component } from 'react';
import { SocialMediaContext } from './Contex';
import PostPageMap from "./PostPageMap"



class Postpage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static contextType = SocialMediaContext;


    render() {
        let Post = this.context.posts.map(item => {
            return <PostPageMap key={item._id} item={item}/>
        })
        return (
            <article>
                {Post}
            </article>
        );
    }
}

export default Postpage;
