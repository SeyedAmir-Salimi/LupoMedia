import React, { useContext, useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { SocialMediaContext } from './Context';

import Logo from '../Images/Logo-3.png';

const ForgetPassword = () => {
	const [ EmailInput, setEmailInput ] = useState('');
	const { forgetPasswordCall, resetPasswordMessage , resetPasswordMessageError } = useContext(SocialMediaContext);
	const inputOnchange = (e) => {
		setEmailInput(e.target.value);
    };
	let history = useHistory();
	
	const forgetPasswordSubmit = (e) => {
		e.preventDefault();
        forgetPasswordCall(EmailInput);
        if(resetPasswordMessageError !== ''){
			setTimeout(() => {
				history.push('/');
			}, 2000);
        }
	};
	return (
		<div className="Loge-in">
			<form className="formStyle" onSubmit={(e) => forgetPasswordSubmit(e)}>
				<span>
					<img src={Logo} alt="Logo" style={{ width: '4rem' }} />
					<h2>Lupo Media</h2>
				</span>
				<span className="InputContainer">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Please write your new password"
						value={EmailInput}
						onChange={(e) => inputOnchange(e)}
					/>
					<br />
				</span>
				<span>
					<button className="button_Log">Reset password</button>
				</span>
                {resetPasswordMessage !== '' ?
                 <div className="Forget-password-message">
                     <h5>Dear</h5>
                     <h3>{resetPasswordMessage}</h3> 
                     <h5>email has been sent to your email address</h5>
					 <h5>You just have one hour to use this link</h5>
                 </div>
                 : ""}
                 {resetPasswordMessageError !== '' ? <h3 className="RedError">{resetPasswordMessageError}</h3> : ""}
			</form>
		</div>
	);
};

export default ForgetPassword;
