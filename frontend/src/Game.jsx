import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image, Card, ListGroup, Form, Button } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import Navigation from "./Nav";
import { useHistory } from "react-router-dom";

const Game = () => {
  //get gameid
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState();
  const [catDetails, setCatDetails] = useState();
  const [reviewDetails, setReviewDetails] = useState();
  const [ratingDetails, setRatingDetails] = useState(0);
  let history = useHistory();

  const [state, setState] = useState({
    rating: 1,
    content: ""
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  useEffect(() => {
    //Get game by gameid
    axios
      .get(`http://localhost:8081/api/game/${id}`)
      .then((res) => {
        const gameData = res.data[0];
        setGameDetails(gameData);
      });

    //Get category by catid
    async function getCategory() {
      try {
        const response = await axios.get(`http://localhost:8081/api/game/${id}`);
        let catid = response.data[0].catid;
        axios
          .get(`http://localhost:8081/api/category/${catid}`)
          .then((res) => {
            const catData = res.data[0];
            setCatDetails(catData);
          });
      } catch (error) {
        console.error(error);
      }
    }

    //Get review by gameid
    axios
      .get(`http://localhost:8081/game/${id}/review`)
      .then((res) => {
        const reviewData = res.data;
        setReviewDetails(reviewData);
        let rating = 0;
        for (let i = 0; i < reviewData.length; i++) {
          rating = rating + reviewData[i].rating;
        }
        let avgRating = rating / reviewData.length;
        setRatingDetails(avgRating.toFixed(1));
      });

    getCategory();


  }, []);

  //Destructure fields from objects
  const { title, description, price, platform, year, images } = gameDetails || {};
  const { catname } = catDetails || {};

  const review = () => {

    const token = localStorage.getItem("token");
    const loggedInUserID = parseInt(localStorage.getItem("loggedInUserID"));

    if (token === null || isNaN(loggedInUserID)) { //if user is not logged in
      console.log("You need to log in!");
    }
    else { //else submit review
      axios
        .post(`http://localhost:8081/user/${loggedInUserID}/game/${id}/review/`, state, {
          headers: {
              "Authorization": "Bearer " + token
          }
      })
        .then((res) => {
          history.push(`/game/${id}`);
        });
      console.log("Review submitted!")
    }
  }

  return (
    <div>
      <Navigation />
      {gameDetails && catDetails && reviewDetails ? (
        <div className="pt-5">

          <Image variant="top" src={images} className="w-50 img-fluid mx-auto pb-5" />
          <h2> {`Title: ${title}`} </h2>
          <h2> {`Platform: ${platform}`} </h2>
          <h2> {`Category: ${catname}`} </h2>
          <h2> {`Description: ${description}`} </h2>
          <h2> {`Price: $${price}`} </h2>
          <h2> {`Published Year: ${year}`} </h2>
          <h2> {`Average rating: ${ratingDetails}/10`} </h2>

          <Card className="w-75 mx-auto my-5" bg="info">
            <Card.Header>Reviews</Card.Header>
            <ListGroup variant="flush">
              {reviewDetails.map((review) => (
                <ListGroup.Item>{review.content} <br></br> {review.rating}/10 <br></br>By: {review.username} </ListGroup.Item>
              ))}
            </ListGroup>

          </Card>

          <Form className="w-75 mx-auto mb-5">
            <Form.Group className="w-25 mx-auto" >
              <Form.Label>Rating (out of 10)</Form.Label>
              <Form.Control as="select"
                id="rating"
                onChange={handleChange}
                value={state.rating}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Leave a review</Form.Label>
              <Form.Control as="textarea" rows={3} id="content" value={state.content}
                onChange={handleChange} />
            </Form.Group>

            <Button variant="dark" type="submit" onClick={review}>Submit</Button>

          </Form>
        </div>
      ) : (
          <CircularProgress />
        )}
    </div>
  );
};

export default Game;
