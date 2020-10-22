import React from "react";
import { Subtract } from "utility-types";
import { Firebase } from "../lib";

type FirebaseProps = {
  firebase: Firebase;
};

export const FirebaseContext = React.createContext<Firebase | null>(null);

export function withFirebase<T extends FirebaseProps>(
  Component: React.ComponentType<T>
) {
  return class extends React.Component<Subtract<T, FirebaseProps>> {
    render() {
      return (
        <FirebaseContext.Consumer>
          {firebase => <Component {...(this.props as T)} firebase={firebase} />}
        </FirebaseContext.Consumer>
      );
    }
  };
}
