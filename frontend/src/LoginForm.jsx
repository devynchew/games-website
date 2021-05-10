import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { withRouter } from "react-router-dom";
import Navigation from "./Nav";


function LoginForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { id, value } = e.target        
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    //Function when the login button is clicked
    const handleSubmitClick = (e) => {
        e.preventDefault();

        const baseUrl = "http://localhost:8081";

        const payload = {
            "email": state.email,
            "password": state.password,
        }
        axios.post(baseUrl + '/api/login', payload)
            .then(function (response) {
                if (response.status === 200) {
                    const token = response.data.token;
                    const loggedInUserID = response.data.UserData[0].userid;
                    const loggedInUserName = response.data.UserData[0].username;
                    const loggedInRole = response.data.UserData[0].role;
                    localStorage.setItem("token", token);
                    localStorage.setItem("loggedInUserID", loggedInUserID);
                    localStorage.setItem("loggedInUserName", loggedInUserName);
                    localStorage.setItem("loggedInRole", loggedInRole);
                    redirectToHome();
                }
                else if (response.code === 204) {
                    console.log("Username and password do not match");
                }
                else {
                    console.log("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.history.push('/');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
    }
    return (
        <>
            <Navigation />
            <div className="card col-12 col-lg-4 login-card mt-5 hv-center mx-auto pt-3">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-check">
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >Log in</button>
                </form>
                <div className="registerMessage">
                    <span>Dont have an account? </span>
                    <a className="loginText" onClick={() => redirectToRegister()}>Register</a>
                </div>
            </div>
        </>
    )
}

export default withRouter(LoginForm);