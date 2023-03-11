import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"
import main from "./loginMain.svg"
import wave from "./wave.png"
import logo from "./logo.png"
import sweetAlert from 'bootstrap-sweetalert';
import "./Login.css";


const Login = () => {
    const { login} = useContext(AuthContext)
    const [uid, setUid] = useState("");
    const [password, setPassword] = useState("");
    const navg = useNavigate()
    const [errors, setErrors] = useState({});

    const Forget = async () =>{
        setErrors({});
        let formErrors = {};
        if (!uid) {
            formErrors.uid = "UID is required";
        }
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        sweetAlert("The new password has been sent to your email check it now", "\n", "success")
        const body = {uid: parseInt(uid, 10)};
        await fetch('https://important-foal-buckle.cyclic.app/sendEmail', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }, 
        })
    }

    const submit = async (e) => {
        e.preventDefault();
        setErrors({});
        let formErrors = {};

        if (!uid) {
            formErrors.uid = "UID is required";
        }

        if (!password) {
            formErrors.password = "Password is required";
        }
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        const body = { uid, password }
        try {
            await login(body)
            navg('/MainPage', { replace: true })
        } catch (error) {
            formErrors.password = "The data is wrong";
            setErrors(formErrors);
        }
    };
    return (
        <div>
            <div className="logoContainer">
                <img className="logo" src={logo} alt="logo" />
            </div>
            <div className="sub-main">
                <h1 className="LogIn">Log In</h1>
                <div>
                    <label className="label_login" htmlFor="uid"></label>
                    <input
                        type="number"
                        id="uid"
                        placeholder="Enter Your UID"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                        className={errors.uid ? 'input_login error-input' : 'input_login'}
                    />
                    {errors.uid && <div className="error-message">{errors.uid}</div>}
                    <label className="label_login" htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errors.password ? 'input_login error-input' : 'input_login'}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}

                    {/* <a href="page_url">
                        <button className="forgot-button">Forgot Your Password?</button>
                    </a> */}

                    <button className="forgot-button" onClick={Forget}>Forgot Your Password?</button>

                    <button className="custom-button" onClick={submit}>Log In</button>
                </div>
            </div>
            <img className="wave" src={wave} alt="wave" />
            <img className="loginimg" src={main} alt="main" />
        </div>
    )
}

export default Login;