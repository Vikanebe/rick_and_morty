import React, {ReactElement} from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {CharacterPageContainer} from "./pages/CharacterPage";
import {EpisodePageContainer} from "./pages/EpisodePage";
import {LocationPageContainer} from "./pages/LocationPage";


function App(): ReactElement {
  return (
    <Switch>
      <Route exact path='/' component={MainPage}/>
      <Route exact path='/character/:characterId' component={CharacterPageContainer}/>
      <Route exact path='/episode/:episodeId' component={EpisodePageContainer}/>
      <Route exact path='/location/:locationId' component={LocationPageContainer}/>
    </Switch>
  );
}

export default App;
