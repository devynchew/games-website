import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { Row } from "react-bootstrap";
import GamesCard from "./GamesCard";
import SearchGameBar from "./SearchGameBar";
import SearchPriceBar from "./SearchPriceBar";
import SearchCatBar from "./SearchCatBar";
import SearchPlatformBar from "./SearchPlatformBar";
import Navigation from "./Nav";

const Games = () => {
  const [games, setGames] = useState();
  const [categories, setCategories] = useState();
  const [inputGame, setGame] = useState('');
  const [filteredGames, setFilteredGames] = useState();
  const [inputPrice, setPrice] = useState();
  const [inputCat, setCat] = useState('');
  const [inputPlatform, setPlatform] = useState('');

  useEffect(() => {
    //Get all games
    axios.get(`http://localhost:8081/api/games`).then((res) => {
      const gamesObject = res.data;
      setGames(gamesObject);
      setFilteredGames(gamesObject);
    });

    //Get all categories
    axios.get(`http://localhost:8081/api/category`).then((res) => {
      const categoryObject = res.data;
      setCategories(categoryObject);
    });

  }, []);

  //Function to filter games by title
  const filterGame = (inputGame) => {
    const filtered = games.filter(game => {
      return game.title.toLowerCase().includes(inputGame.toLowerCase())
    })
    console.log(inputGame);
    setGame(inputGame);
    setFilteredGames(filtered);
    console.log(filteredGames);
  }

  //Function to filter games by max price
  const filterPrice = (inputPrice) => {

    let filtered = [];

    for (let i = 0; i < games.length; i++) {
      let game = games[i];
      if (inputPrice === "") {
        filtered = games;
        console.log(filtered);
      } else if (game.price <= inputPrice) {
        filtered.push(game);
      }
    }
    setPrice(inputPrice);
    setFilteredGames(filtered);
  }

  //Function to filter games by category selected
  const filterCat = (inputCat) => {
    //if user selects 'All', show all games.
    if (inputCat == 'All') {
      setCat(inputCat);
      setFilteredGames(games);
    } else { //else show only games under the selected category
      const filtered = games.filter(game => {
        return game.catid == inputCat;
      })
      setCat(inputCat);
      setFilteredGames(filtered);
    }
  }

  //Function to filter games by platform
  const filterPlatform = (inputPlatform) => {
    //if user selects 'All', show all games.
    if (inputPlatform == 'All') {
      setPlatform(inputPlatform);
      setFilteredGames(games);
    } else { //else show only games by selected platform
      const filtered = games.filter(game => {
        return game.platform == inputPlatform;
      })
      setPlatform(inputPlatform);
      setFilteredGames(filtered);
    }
  }


  return (
    <>
      <Navigation />
      {filteredGames && categories && games ? (
        <>
          <Row className="mx-auto">
            <SearchGameBar input={inputGame} onChange={filterGame} />
            <SearchPriceBar input={inputPrice} onChange={filterPrice} />
          </Row>

          <Row className="pt-5">
            <SearchCatBar input={inputCat} onChange={filterCat} data={categories} />
            <SearchPlatformBar input={inputPlatform} onChange={filterPlatform} data={games} />
          </Row>

          <Row className="mx-auto justify-content-center pt-5">

            {filteredGames.map((game) => (
              <GamesCard key={game.gameid} game={game} />
            ))}
          </Row>
        </>
      ) : (
          <CircularProgress />
        )}
    </>
  );
};

export default Games;
