import React, { useContext } from 'react';
import { SocialMediaContext } from './Context';
import PostPageMap from './PostPageMap';
import NavBar from './NavBar';
import CoverMy from './CoverMy';
import Spinner from './Spinner'
const MyPage = () => {
	const { posts , id } = useContext(SocialMediaContext);
	let MyPost = posts.filter((item) => item.user._id === id).map((item) => {
		return <PostPageMap key={item._id} item={item} />;
	});

	return (
		<div>
			<NavBar />
			<CoverMy />
			{posts.length === 0 && <Spinner/>}
			{MyPost}
		</div>
	);
};

export default MyPage;
