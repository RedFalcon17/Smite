import React from "react";
import { User } from "firebase";
import { RouteComponentProps, withRouter } from "react-router";
import { withFirebase } from "./index";
import { Firebase } from "../lib";
import { CurrentUserContext } from "./CurrentUserContext";

type Props = {
  firebase: Firebase;
} & RouteComponentProps;

export function withAuthorization<T extends Props>(
  condition: (currentUser: User | null) => boolean
) {
  return (Component: React.ComponentType<T>) => {
    class WithAuthorization extends React.Component<T> {
      listener: firebase.Unsubscribe | null = null;
      componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
          currentUser => {
            if (!condition(currentUser)) {
              this.props.history.push("/auth");
            }
          }
        );
      }

      componentWillUnmount() {
        this.listener && this.listener();
      }

      render() {
        return (
          <CurrentUserContext.Consumer>
            {currentUser =>
              condition(currentUser) ? <Component {...this.props} /> : null
            }
          </CurrentUserContext.Consumer>
        );
      }
    }

    return withRouter(withFirebase(WithAuthorization));
  };
}
