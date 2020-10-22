import React from "react";
import { User } from "firebase";
import { Subtract } from "utility-types";
import { withFirebase } from "./FirebaseContext";
import { Firebase } from "../lib";

type FirebaseProps = {
  firebase: Firebase;
};

type CurrentUserProps = {
  currentUser: User | null;
} & FirebaseProps;

type State = {
  currentUser: User | null;
};

export const CurrentUserContext = React.createContext<User | null>(null);

export function withCurrentUser<T extends CurrentUserProps>(
  Component: React.ComponentType<T>
) {
  class WithCurrentUser extends React.Component<
    Subtract<T, { currentUser: User | null }>,
    State
  > {
    listener: firebase.Unsubscribe | null = null;
    state = {
      currentUser: null
    };

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        currentUser => {
          currentUser
            ? this.setState({ currentUser })
            : this.setState({ currentUser: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener && this.listener();
    }

    render() {
      return (
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Component {...(this.props as T)} />
        </CurrentUserContext.Provider>
      );
    }
  }
  return withFirebase(WithCurrentUser);
}
