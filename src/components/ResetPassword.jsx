import React, { useState, useContext , useRef ,useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { SocialMediaContext } from './Context';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import Logo from '../Images/Logo-3.png';


const  ResetPassword = () => {
	const [ TypeHandel, setTypeHandel ] = useState('password');
	const [ PassInput, setPassInput ] = useState('');
	const [ ConfirmPassInput, setConfirmPassInput ] = useState('');
	const [ message, setmessage] = useState('');
	const { resetPasswordCall } = useContext(SocialMediaContext);

    const PassTypeHandel = (type) => {
		setTypeHandel(type);
	};

	const inputOnchangePass = (e) => {
		setPassInput(e.target.value);
	};
	const inputOnchangeConfirmPass = (e) => {
		setConfirmPassInput(e.target.value);
	};
	let history = useHistory();
    const resetPasswordSubmit = (e) =>{
		e.preventDefault();
		if(PassInput === ConfirmPassInput ){
			const LINK = window.location.pathname
			const secondSplit = LINK.slice(15, 187);
			const PASSWORD = PassInput
			resetPasswordCall(secondSplit,PASSWORD)
			setmessage("The password is change")
			setTimeout(() => {
				history.push('/');
			}, 2000);
		}else{
			setmessage("The passwords are not the same")
		}

	}

    return (
<div className="Loge-in">
			<form className="formStyle" onSubmit={(e)=> resetPasswordSubmit(e)}>
				<span>
					<img src={Logo} alt="Logo" style={{ width: '4rem' }} />
					<h2>Lupo Media</h2>
				</span>
				<span className="InputContainer">
					<input
						type={TypeHandel}
						name="email"
						id="email"
						placeholder="Please write your new password"
						value={PassInput}
						onChange={(e)=> inputOnchangePass(e)}
					/>
					<br />
				</span>
				<span className="InputContainer">
					<input
						type={TypeHandel}
						name="password"
						id="password"
						placeholder="Please confirm your passWord"
						value={ConfirmPassInput}
						onChange={(e)=> inputOnchangeConfirmPass(e)}
					/>
					<br />
					{TypeHandel === 'password' ? (
						<AiFillEye className="PasswordEye" onClick={() => PassTypeHandel('text')} />
					) : (
						<AiFillEyeInvisible className="PasswordEye" onClick={() => PassTypeHandel('password')} />
					)}
					<br />
				</span>
				<span>
					<button className="button_Log" onClick={(e)=> resetPasswordSubmit(e)}>
						Save Password
					</button>
				</span>
            	{message !== null ? <h3 className="RedError">{message}</h3> : ""}
			</form>
		</div>
    )
}

export default ResetPassword
