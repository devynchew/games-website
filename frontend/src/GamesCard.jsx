import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Image } from "react-bootstrap";

const GamesCard = (props) => {
  const { game } = props;
  const { gameid, title, price, images } = game;
  let history = useHistory();

  return (
    <div
      onClick={() => history.push(`/game/${gameid}`)}
    >
      <Card style={{ width: '18rem' }}>
        <Image variant="top" src= {images} className ="img-fluid mx-auto"/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            ${price}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GamesCard;
