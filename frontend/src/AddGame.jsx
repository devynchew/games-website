import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { withRouter } from "react-router-dom";
import Navigation from "./Nav";
import { Form } from "react-bootstrap";
import CatDropdown from "./CatDropdown";
import PlatformDropdown from "./PlatformDropdown";
import { CircularProgress } from "@material-ui/core";


function AddGame(props) {
    const [games, setGames] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        //Get all games
        axios.get(`http://localhost:8081/api/games`).then((res) => {
            const gamesObject = res.data;
            setGames(gamesObject);
        });

        //Get all categories
        axios.get(`http://localhost:8081/api/category`).then((res) => {
            const categoryObject = res.data;
            setCategories(categoryObject);
        });

    }, []);

    const [state, setState] = useState({
        title: "",
        description: "",
        price: "",
        platform: "PC",
        year: "",
        catid: "6"
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

        const token = localStorage.getItem("token");

        const baseUrl = "http://localhost:8081";

        const payload = {
            "title": state.title,
            "description": state.description,
            "price": state.price,
            "platform": state.platform,
            "year": state.year,
            "catid": state.catid
        }

        axios.post(baseUrl + '/game', payload, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Game added!");
                    props.history.push("/");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //console.log(state);
    return (
        <>
            <Navigation />
            {categories && games ? (
                <div className="card col-md-6 col-lg-6 login-card mt-5 mb-5 hv-center mx-auto pt-3">
                    <h2>Add a new game</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Game title*:</Form.Label>
                            <Form.Control
                                id="title"
                                onChange={handleChange}
                                value={state.title} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                id="description"
                                onChange={handleChange}
                                value={state.description} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price:</Form.Label>
                            <Form.Control
                                id="price"
                                onChange={handleChange}
                                value={state.price} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year:</Form.Label>
                            <Form.Control
                                id="year"
                                onChange={handleChange}
                                value={state.year} />
                        </Form.Group>
                        <Form.Group className="w-25 mx-auto">
                            <Form.Label>Platform:</Form.Label>
                            <Form.Control
                                as="select"
                                id="platform"
                                onChange={handleChange}
                                value={state.platform}>
                                <PlatformDropdown data={games} />
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="w-50 mx-auto">
                            <Form.Label>Category:</Form.Label>
                            <Form.Control
                                as="select"
                                id="catid"
                                onChange={handleChange}
                            >
                                <CatDropdown data={categories} />
                            </Form.Control>
                        </Form.Group>

                        <button
                            type="submit"
                            className="btn btn-primary mb-5"
                            onClick={handleSubmitClick}
                        >Submit</button>
                    </Form>
                </div>
            ) : (
                    <CircularProgress />
                )}
        </>
    )
}

export default withRouter(AddGame);