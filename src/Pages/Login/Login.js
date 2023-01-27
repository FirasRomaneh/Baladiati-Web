import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"
import "./Login.css";
import logo from "./logo.png";

const Login = () => {
const { login } = useContext(AuthContext)
const [uid, setUid] = useState("");
const [password, setPassword] = useState("");
const navg = useNavigate()
const [errors, setErrors] = useState({});

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
       <img src={logo} alt="logo" className="logo_login"/>
       <div className="sub-main">

     <h1 className="LogIn">Log In</h1>
     <div>
        <label htmlFor="uid">UID Number:</label>
            <input
            type="number"
            id="uid"
                placeholder="UID"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                className={errors.uid ? 'error-input' : ''}
                />
                {errors.uid && <div className="error-message">{errors.uid}</div>}
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'error-input' : ''}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
                <button className="custom-button" onClick={submit}>Log In</button>
            </div>
                </div>
                </div>
    )
}
    
export default Login;