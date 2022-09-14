import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_PUBLIC_KEY}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            {/* im using swhitch and not routes because react router dom is v5 and not v6 */}
            {/* <Route path="/" exact component={() => <Redirect to="/posts" />} /> */}
            <Route path="/" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            {/* <Route
              path={["/creators/:name", "/tags/:name"]}
              component={CreatorOrTag}
            /> */}
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
