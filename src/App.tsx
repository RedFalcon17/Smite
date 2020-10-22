import React, { Component } from "react";
import { User } from "firebase";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { Routes } from "./routes";
import { store, history } from "./redux";
import { ResponsiveContainer, withCurrentUser } from "./components";
import { Firebase } from "./lib";

type Props = {
  firebase: Firebase;
  currentUser: User | null;
};

type State = {
  currentUser: User | null;
};

class App extends Component<Props, State> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ResponsiveContainer>
            <Routes currentUser={this.props.currentUser} />
          </ResponsiveContainer>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default withCurrentUser(App);
