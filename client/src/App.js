import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch> 
        {/* im using swhitch and not routes because react router dom is v5 and not v6 */}
        <Route path='/' exact component={Home}/>
        <Route path='/auth' exact component={Auth} />
      </Switch>
    </Container>
    </BrowserRouter>
  );
};

export default App;
