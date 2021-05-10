import React, { useState } from 'react';
import axios from "axios";
import Navigation from "./Nav";
import { useHistory } from "react-router-dom";


function RegistrationForm() {
    let history = useHistory();

    const [state, setState] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password == state.confirmPassword) {
            sendDetailsToServer()
        } else {
            console.log('Passwords do not match');
        }
    }

    const redirectToLogin = () => {
        history.push('/login');
    }


    const sendDetailsToServer = () => {
        const baseUrl = "http://localhost:8081";

        if (state.email.length && state.password.length) {
            const payload = {
                "email": state.email,
                "username": state.username,
                "password": state.password,
            }
            axios.post(baseUrl + '/api/user', payload)
                .then(function (response) {
                    if (response.status == 200) {
                        redirectToLogin();
                    } else {
                        console.log("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log('Please enter valid username and password')
        }

    }

    return (
        <>
            <Navigation />
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center mx-auto pt-4">
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
                        <label htmlFor="exampleInputUsername1">Username</label>
                        <input type="username"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={state.username}
                            onChange={handleChange}
                        />
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
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        <input type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={state.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mb-5"
                        onClick={handleSubmitClick}
                    >
                        Register
                </button>
                </form>
            </div>
        </>
    )
}

export default RegistrationForm;