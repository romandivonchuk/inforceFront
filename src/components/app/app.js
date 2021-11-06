import React from "react";

import MainPage from "../main-page";
import Details from "../details";
import { Route, Switch } from 'react-router-dom'
import "./app.css"

function App() {
 
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route path="/:id" component={Details}/>
      </Switch>
    </div>
  );
}

export default App;
