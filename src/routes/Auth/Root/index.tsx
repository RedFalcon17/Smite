import React from "react";
import { SignIn } from "./SignIn";
import { Dashboard } from "./Dashboard";
import { CurrentUserContext } from "../../../components";
import { Firebase } from "../../../lib";

type Props = {
  firebase: Firebase;
};

export const Root = (props: Props) => (
  <CurrentUserContext.Consumer>
    {currentUser => (currentUser ? <Dashboard /> : <SignIn />)}
  </CurrentUserContext.Consumer>
);
