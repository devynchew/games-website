import React from "react";
import "./styles.css";
import { Switch, Route } from "react-router-dom";
import Games from "./Games";
import Game from "./Game";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import AddGame from "./AddGame";
import AddCat from "./AddCat";

export default function App() {


  return (
    <div className="App">


      <Switch>
        <Route exact path="/" children={<Games />} />
        <Route path="/game/:id" children={<Game />} />
        <Route path="/login" children={<LoginForm />} />
        <Route path="/register" children={<RegistrationForm />} />
        <Route path="/addgame" children={<AddGame />} exact />    
        <Route path="/addcategory" children={<AddCat />} />
      </Switch>
    </div>
  );
}