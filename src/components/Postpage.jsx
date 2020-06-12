import React, { useContext } from 'react'
import { SocialMediaContext } from './Context';
import PostPageMap from "./PostPageMap"

const Postpage = () => {
    const { posts } = useContext(SocialMediaContext)
    let Post = posts.map(item => {
        return <PostPageMap key={item._id} item={item} />
    })
    return (
        <article>
            {Post}
        </article>
    );
}

export default Postpage;



