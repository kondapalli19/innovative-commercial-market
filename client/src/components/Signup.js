import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Signup.css";
import "../css/NavBar.css";

const Signup = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = inputs;

    const onChange = e => setInputs({...inputs, [e.target.name]: e.target.value});

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password, name };
            const response = await fetch(
                "http://localhost:5000/signup", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const result = await response.json();

            if (result.token) {
                localStorage.setItem("token", result.token);
                setAuth(true);
            } else {
                setAuth(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    
    return (
        <Fragment>
            <div className="signupBackground">
                <div>
                    <nav className="navbar">
                        <ul>
                            <li><div className="navBox"><a href="/">Home</a></div></li>
                        </ul>
                    </nav>
                </div>
                <h1 className="text-center my-5">Signup</h1>
                <form id="signupForm" onSubmit={onSubmitForm}>
                    <input type="text" name="email" value={email} placeholder="email" onChange={e => onChange(e)} className="form-control my-3" />
                    <input type="password" name="password" value={password} placeholder="password" onChange={e => onChange(e)} className="form-control my-3" />
                    <input type="text" name="name" value={name} placeholder="name" onChange={e => onChange(e)} className="form-control my-3" />
                    <button id="signupButton" className="btn btn-success btn-block">Sign up</button> <Link id="loginButton" to="/login">Already have an account?</Link>
                </form>
            </div>
        </Fragment>
    );
};

export default Signup;
