import React, { useState, useContext , useRef ,useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { SocialMediaContext } from './Context';
import { FcCamera, FcInternal } from 'react-icons/fc';

const PostInput = () => {
	const [ PostCaption, setPostCaption ] = useState('');
	const [ InputValue, setInputValue ] = useState('');

	const { User_Name, id, AddPostCall } = useContext(SocialMediaContext);

	const PO_Pic = document.getElementById('PO_Pic');

	const triggerInputFile = () => {
		PO_Pic.click();
	};
	const InputFileName = () => {
		setInputValue(PO_Pic.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
	};

	const WritePost = (e) => {
		e.preventDefault();
		AddPostCall(id, PostCaption);
		setPostCaption('');
		setInputValue('');
	};
	const onChangeHandler = (e) => {
		setPostCaption(e.target.value);
	};

	const PostCaptionRef = useRef()
	useEffect(() => {
		PostCaptionRef.current.focus();
	}, [])

	const FontColor = { color: 'rgb(223, 209, 144)' };
	return (
		<div>
			<div>
				<form onSubmit={WritePost} className="PostInput" disabled={PostCaption === ''}>
					<input
						type="text"
						name="PostCaption"
						className="PostCaption"
						placeholder={'  What Do You Think ' + User_Name + '...'}
						value={PostCaption}
						onChange={(e) => onChangeHandler(e)}
						ref={PostCaptionRef}
					/>

					<FcInternal id="FC" className="FC_ICONS" onClick={WritePost} />
					<FcCamera onClick={triggerInputFile} className="FC_ICONS"/>
					{InputValue !== '' ? (
						<p style={FontColor}>{InputValue}</p>
					) : (
						""
						// <p style={FontColor}>No File Chosen Yet</p>
					)}
				</form>
			</div>
			<input type="file" name="PostPic" id="PO_Pic" style={{ visibility: 'hidden' }} onChange={InputFileName} />
		</div>
	);
};

export default PostInput;
