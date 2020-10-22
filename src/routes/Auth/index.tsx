import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { Root } from "./Root";
import { AuthBuildsContainer } from "./Builds";
import { AuthTierlist } from "./Tierlist";

export const AuthRoutes = ({ match }: RouteComponentProps) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.path}/builds`}
        component={AuthBuildsContainer}
      />
      <Route
        exact
        path={`${match.path}/builds/:id`}
        component={AuthBuildsContainer}
      />
      <Route exact path={`${match.path}/tierlists`} component={AuthTierlist} />
      <Route exact path={`${match.path}`} component={Root} />
    </Switch>
  );
};
