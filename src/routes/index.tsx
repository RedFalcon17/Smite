import React from "react";
import { Route, Switch } from "react-router-dom";
import { User } from "firebase";
import { Home } from "./Home";
import { About } from "./About";
import { GodBuildContainer } from "./Builds";
import { Gods } from "./Gods";
import { Giveaways } from "./Giveaways";
import { Tiers } from "./Tiers";
import { List } from "./List";
import { NotFound } from "./404";
import { AuthRoutes } from "./Auth";

type Props = {
  currentUser: User | null;
};

export function Routes(props: Props) {
  return (
    <Switch>
      <Route exact path="/about" component={About} />
      <Route
        exact
        path="/gods/:godId/builds/:buildId"
        component={GodBuildContainer}
      />
      <Route exact path="/gods/:id" component={Gods} />
      <Route exact path="/giveaways" component={Giveaways} />
      <Route exact path="/tierlists/:id" component={List} />
      <Route exact path="/tierlists" component={Tiers} />
      <Route path="/auth" component={AuthRoutes} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}
