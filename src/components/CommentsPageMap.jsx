import React, { useContext } from 'react';
import { SocialMediaContext } from './Context';
import { FaTrashAlt } from 'react-icons/fa';
import LastSeen from './LastSeen';
import ProfilePicture from './ProfilePicture';
import { BrowserRouter as Router, Switch, Route, Link , useHistory} from 'react-router-dom';

const CommentsPageMap = ({ item }) => {
	const { id, DeleteCommentCALL, comments, GetUSerPageData, ridirectFunction , UserPageData} = useContext(SocialMediaContext);

	let history = useHistory();
	const GoToLink = (link) => {
		ridirectFunction(link);
		history.push(link);
		console.log(history.location.pathname);
	};

	const GetUSerPageDataSet = (ID,PIC,NAME) => {
		GetUSerPageData(ID,PIC,NAME);
	}
	const GoTo = (ID,PIC,NAME) => {
		GetUSerPageDataSet(ID,PIC,NAME);
		 if ( ID === id) {
			GoToLink(`/MyPage`);
		} else {
			GoToLink(`/${NAME}`);
		}
	};
	return (
		<div>
			{comments.map((com) => (
				<div key={com._id}>
					{item._id === com.postref._id ? (
						<div className="postpage_Comment_detail">
							<div className="Comment_pic_username_date">
								<span className="CommentProfilePic_Wrapper">
									<ProfilePicture ProfilePic={com.user.ProfilePic} User_Name={com.user.name}
									onClick={()=> GoTo(com.user._id , com.user.ProfilePic ,com.user.name )} />
								</span>
								<h5 className="Comment_username">{com.user.name}</h5>
								<h6 className="Comment_date">
									<LastSeen date={com.date} />
								</h6>
							</div>
							<h4>
								{com.comment}{' '}
								{com.user._id === id || id === item.user._id ? (
									<FaTrashAlt
										style={{ fontSize: '1rem' }}
										className="postpage_trash"
										onClick={() => DeleteCommentCALL(com._id, com.postref._id)}
									/>
								) : (
									''
								)}
							</h4>
						</div>
					) : (
						''
					)}
				</div>
			))}
		</div>
	);
};

export default CommentsPageMap;
