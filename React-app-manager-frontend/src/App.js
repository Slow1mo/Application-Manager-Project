import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import { inject, observer } from "mobx-react";

import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import ApplicationsPage from "./pages/apps/ApplicationsPage";
import CreateApplicationPage from "./pages/create-application/CreateApplicationPage";

@inject("routerStore")
@observer
class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={SignInPage} />
        <Route path="/signin/" component={SignInPage} />
        <Route path="/signup/" component={SignUpPage} />
        <Route exact path="/applications" component={ApplicationsPage} />
        <Route
          exact
          path="/applications/create"
          component={CreateApplicationPage}
        />
      </Fragment>
    );
  }
}

export default App;
