import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Navigation from "./Nav";
import { Form } from "react-bootstrap";


function AddCat(props) {

    const [state, setState] = useState({
        catname: "",
        description: ""
    })

    const handleChange = (e) => {
        console.log(e.target);
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    //Function when the submit button is clicked
    const handleSubmitClick = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const baseUrl = "http://localhost:8081";

        const payload = {
            "catname": state.catname,
            "description": state.description
        }

        axios.post(baseUrl + '/category', payload, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Category added!");
                    props.history.push("/");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    console.log(state);

    return (
        <>
            <Navigation />
            <div className="card col-md-6 col-lg-6 mt-5 mb-5 hv-center mx-auto pt-3">
                <h2>Add a new category</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Category:</Form.Label>
                        <Form.Control
                            id="catname"
                            onChange={handleChange}
                            value={state.catname} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            id="description"
                            onChange={handleChange}
                            value={state.description} />
                    </Form.Group>

                    <button
                        type="submit"
                        className="btn btn-primary mb-5"
                        onClick={handleSubmitClick}
                    >Submit</button>
                </Form>
            </div>
        </>
    )
}

export default withRouter(AddCat);