import React, {ReactElement} from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {CharacterPage} from "./pages/CharacterPage";
import {EpisodePage} from "./pages/EpisodePage";
import {LocationPage} from "./pages/LocationPage";


function App(): ReactElement {
  return (
    <Switch>
      <Route exact path='/' component={MainPage}/>
      <Route exact path='/character' component={CharacterPage}/>
      <Route exact path='/character/episode' component={EpisodePage}/>
      <Route exact path='/character/location' component={LocationPage}/>
    </Switch>
  );
}

export default App;
