import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { SocialMediaContext } from './Context';
import { FcLike, FcDislike } from 'react-icons/fc';
import { TiHeart, TiHeartOutline } from "react-icons/ti";
import { FaTrashAlt } from 'react-icons/fa';
import { FcInternal } from 'react-icons/fc';
import CommentsPageMap from './CommentsPageMap';
import LastSeen from './LastSeen';
import ProfilePicture from './ProfilePicture';

const PostPageMap = ({ item }) => {
	const [ comment, setcomment ] = useState('');
	const { User_Name, id, WritecommentCALL, DeletePostCALL, GetUSerPageData, ridirectFunction, likeCall } = useContext(
		SocialMediaContext
	);
	const onchangHandler = (e) => {
		setcomment(e.target.value);
	};
	console.log(item.Likes);
	const WriteComments = (e, ref, comments, users) => {
		e.preventDefault();
		WritecommentCALL(ref, comments, users);
		setcomment('');
	};

	let history = useHistory();

	const GoToLink = (link) => {
		ridirectFunction(link);
		history.push(link);
		console.log(history.location.pathname);
	};

	const GoTo = () => {
		GetUSerPageData(item.user._id, item.user.ProfilePic, item.user.name);
		if (item.user._id === id) {
			GoToLink(`/MyPage`);
		} else {
			GoToLink(`/${item.user.name}`);
		}
	};
	const makeLike = (like)=>{
		likeCall(item._id, like)
	}
	return (
		<div>
			<div key={item._id} className="postpage">
				<div className="PostProfilPic_Wrapper">
					<ProfilePicture
						ProfilePic={item.user.ProfilePic}
						User_Name={User_Name}
						Size={'Medium'}
						onClick={GoTo}
					/>
				</div>
				<h3 className="postpage_name">{item.user.name}</h3>
				<p className="postpage_date">
					<LastSeen date={item.date} />
				</p>

				{item.user._id === id ? (
					<FaTrashAlt className="postpage_trash" onClick={() => DeletePostCALL(item._id, id)} />
				) : (
					''
				)}
				<div className="postpage_Like">
				<h6>Likes: {item.Likes.length}</h6>
				</div>
				<br />

				{item.media !== undefined && item.type === 'pic' ? (
					<img src={item.media} alt={item.caption} className="postpage_Image" />
				) : (

					''
				)}
				{item.media !== undefined && item.type === 'video' ? (
					<video src={item.media} width="320" height="240" controls controlsList="nodownload" > Your browser does not support the video tag.</video>
				) : (

					''
				)}

				<h4 className="postpage_Caption">{item.caption}</h4>
				<form onSubmit={(e) => WriteComments(e, item._id, comment, id)}>
					<span className="postpage_CommentInput">
					<div className="like">
					<div className="emojis">
					<span onClick={()=> makeLike("laugh")}>😂</span>
					<span onClick={()=> makeLike("tongue")}>😜</span>
					<span onClick={()=> makeLike("love")}>😍</span>
					<span onClick={()=> makeLike("kiss")}>😘</span>
					<span onClick={()=> makeLike("oh")}>😰</span>
					<span onClick={()=> makeLike("cry")}>😭</span>
					<span onClick={()=> makeLike("angry")}>😡</span>
					<span onClick={()=> makeLike("poop")}>💩</span>
					</div>
					<TiHeartOutline className="FcLike"/>
					</div>
						<input
							type="text"
							name=""
							className="postpageComments"
							placeholder=" Write Your Commnet"
							onChange={onchangHandler}
							value={comment}
						/>
						<FcInternal
							className="FC_ICONS"
							style={{ fontSize: '2rem' }}
							onClick={(e) => WriteComments(e, item._id, comment, id)}
						/>
					</span>
				</form>
				<h4 className="postpage_Comment">comments:</h4>
				<CommentsPageMap key={item._id} item={item} />
			</div>
		</div>
	);
};

export default PostPageMap;
