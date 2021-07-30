import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import UserProfileContainer from "../containers/UserProfileContainer";
import SetUpShow from "../containers/SetUpShow";
import RollShow from "../containers/RollShow";
import SetUpForm from "./forms/SetUpForm";
import RollForm from "./forms/RollForm";
import FrameForm from "./forms/FrameForm";
import EditRollForm from "./forms/EditRollForm";
import EditSetUpForm from "./forms/EditSetUpForm";
import EditFrameForm from "./forms/EditFrameForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2>Hello from react</h2>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile" component={UserProfileContainer} user={currentUser} />
        <AuthenticatedRoute exact path="/setups/new" component={SetUpForm} user={currentUser} />
        <AuthenticatedRoute exact path="/rolls/new" component={RollForm} user={currentUser} />
        <AuthenticatedRoute exact path="/setups/:id" component={SetUpShow} user={currentUser} />
        <AuthenticatedRoute exact path="/rolls/:id" component={RollShow} user={currentUser} />
        <AuthenticatedRoute exact path="/rolls/:id/edit" component={EditRollForm} user={currentUser} />
        <AuthenticatedRoute exact path="/setups/:id/edit" component={EditSetUpForm} user={currentUser} />
        <AuthenticatedRoute exact path="/rolls/:id/frames/new" component={FrameForm} user={currentUser} />
        <AuthenticatedRoute exact path="/rolls/:id/frames/:frameId/edit" component={EditFrameForm} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
