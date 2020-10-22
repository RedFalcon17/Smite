import React, { useState } from "react";
import { Button, ButtonGroup } from "semantic-ui-react";
import { AuthBuildsContainer } from "../Builds";
import { AuthTierlist } from "../Tierlist";

export const Dashboard = () => {
  const [view, handleView] = useState("builds");
  return (
    <div className="ss-page">
      <ButtonGroup>
        <Button onClick={() => handleView("builds")} active={view === "builds"}>
          Builds
        </Button>
        <Button.Or />
        <Button
          onClick={() => handleView("tierlists")}
          active={view === "tierlists"}
        >
          Tierlists
        </Button>
      </ButtonGroup>
      {view === "builds" ? <AuthBuildsContainer /> : <AuthTierlist />}
    </div>
  );
};
