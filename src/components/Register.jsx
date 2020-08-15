import React, { useState, useContext , useEffect , useRef} from 'react'
import { SocialMediaContext } from './Context';
import { BrowserRouter as Router, Switch, Route, Link ,useHistory} from "react-router-dom";
import Logo from '../Images/Logo-3.png'
import { AiFillEyeInvisible , AiFillEye } from "react-icons/ai";

const Register = () => {
    const {RegisterErrortoNull,redirect,  RegisterFunctCALL, RegisterError , nameError, emailError, passwordError, ConfirmPassWordError ,ridirectFunction} = useContext(SocialMediaContext)
    const [Register, setRegister] = useState({
        information: {
            name: '',
            email: '',
            sesso: "Man",
            password: '',
            ConfirmPassWord: '',
            err: '',
        }
    })
    const [TypeHandel , setTypeHandel] = useState("password");
    
    const PassTypeHandel = (type)=>{
        setTypeHandel(type)
    }
     
    const onchangeHandler = (e) => {
        let copy = { ...Register.information };
        copy[e.target.name] = e.target.value;
        setRegister({ information: copy });
    }

    const Registration = (e, Registername, Registeremail, Registersesso, Registerpassword,RegisterConfirmPassWord) => {
        e.preventDefault();
        RegisterFunctCALL(Registername, Registeremail, Registersesso, Registerpassword, RegisterConfirmPassWord);
    }
    let history = useHistory();

    useEffect(() => {
        if (redirect === "/") {
            history.push("/")
        }
    })
    
    const GoToLink = (link) =>{
        ridirectFunction(link)
        history.push(link)
        RegisterErrortoNull();
    }
    useEffect(()=>{
		nameRef.current.focus();
	}, [])
    const nameRef = useRef(null);
    
    return (
        <div className="Loge-in">
            <form className="formStyle"
                onSubmit={(e) => Registration(e, Register.information.name, Register.information.email, Register.information.sesso, Register.information.password, Register.information.ConfirmPassWord)}
            >
                <span >
                    <img src={Logo} alt="Logo" style={{ width: "4rem" }} />
                    <h2 className="span">Lupo Media</h2>
                </span>
                <span  className="InputContainer">
                    <input type="text" name="name" id="name" placeholder="Please Write Your Name and Family" ref={nameRef} onChange={onchangeHandler} value={Register.information.name} /><br />
                </span>
                <span className="InputContainer">
                    <input type="email" name="email" id="email" placeholder="Please Write Your Email" onChange={onchangeHandler} value={Register.information.email} /><br />
                </span >
                <select name="sesso" id="RG_Sesso" value={Register.information.sesso} onChange={onchangeHandler}>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                </select >
                <span className="InputContainer">
                    <input type={TypeHandel} name="password" id="password" placeholder="Please Enter Your PassWord" onChange={onchangeHandler} value={Register.information.password} />
                    {TypeHandel === "password" ?
                    <AiFillEye className="PasswordEye" onClick={()=> PassTypeHandel("text")}/> :
                    <AiFillEyeInvisible className="PasswordEye" onClick={()=> PassTypeHandel("password")}/>}
                    <br />
                </span>
                <span className="InputContainer">
                    <input type={TypeHandel} name="ConfirmPassWord" id="ConfirmPassWord" placeholder="Please Confirm Your PassWord" onChange={onchangeHandler} value={Register.information.ConfirmPassWord} />

                    <br />
                </span>
                <span>
                    <button className="button_Log" onClick={(e) => Registration(e, Register.information.name, Register.information.email, Register.information.sesso, Register.information.password, Register.information.ConfirmPassWord)}>Register</button>
                </span>
                {/* <span>
                    <button className="button_Log" onClick={()=> GoToLink("/")}>Back</button>
                </span> */}
            </form>
            {RegisterError !== null ? <h3 className="RedError">{RegisterError}</h3> : ""}
            {nameError !== null ? <h3 className="RedError" >{nameError}</h3> : ""}
            {emailError !== null ? <h3 className="RedError">{emailError}</h3> : ""}
            {passwordError !== null ? <h3 className="RedError">{passwordError}</h3> : ""}
            {ConfirmPassWordError !== null ? <h3 className="RedError">{ConfirmPassWordError}</h3> : ""}
        </div>
    );
}

export default Register;
