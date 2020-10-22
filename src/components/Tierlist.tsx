import React, { Component, ReactElement } from "react";
import { Button, Message, Input } from "semantic-ui-react";
import { User } from "firebase";
import { Tier } from "./Tier";
import { API } from "../lib";

import "./tierlist.css";

type GodBlip = {
  name: string;
  photo: string;
  tier: string;
};

type Props = {
  godBlips: GodBlip[];
  user: User | null;
};

type State = {
  gods: GodBlip[];
  message: string;
  messageType: "success" | "error" | null;
  title: string;
};

export class Tierlist extends Component<Props, State> {
  state = {
    gods: this.props.godBlips,
    message: "",
    messageType: null,
    title: ""
  };

  onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("id", id);
  };

  onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  onDrop = (e: React.DragEvent<HTMLDivElement>, tier: string) => {
    let id = e.dataTransfer.getData("id");

    let gods = this.state.gods.filter(
      (god: { name: string; tier: string; photo: string }) => {
        if (god.name === id) {
          god.tier = tier;
        }
        return god;
      }
    );

    this.setState({
      ...this.state,
      gods
    });
  };

  onSubmit = async () => {
    let authToken;
    try {
      const tierlist = {
        title: this.state.title,
        gods: this.state.gods,
        dateCreated: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        })
      };
      authToken = this.props.user
        ? await this.props.user.getIdToken().then(token => token)
        : "";
      console.log(authToken);
      API.post("/tierlists", JSON.stringify(tierlist), {
        Authorization: `Bearer ${authToken}`
      });
      this.setState({
        message: "Tierlist successfully created",
        messageType: "success"
      });
    } catch (error) {
      this.setState({
        message:
          "An error occurred and the tierlist count not be created. Try again later.",
        messageType: "error"
      });
      console.error(error);
    }
  };

  render() {
    const tiers: { [key: string]: ReactElement[] } = {
      ss: [],
      "s+": [],
      s: [],
      "a+": [],
      a: [],
      "b+": [],
      b: [],
      c: [],
      d: [],
      available: []
    };

    this.state.gods.forEach(
      (god: { name: string; photo: string; tier: string }) => {
        tiers[god.tier].push(
          <div
            key={god.name}
            onDragStart={e => this.onDragStart(e, god.name)}
            draggable
            className="god"
          >
            <img src={god.photo} alt={god.name} />
          </div>
        );
      }
    );

    const { state } = this;
    return (
      <div className="tierlist-comp">
        {state.message && (
          <Message
            content={state.message}
            negative={state.messageType === "error"}
            success={state.messageType === "success"}
            onDismiss={() => this.setState({ message: "" })}
          />
        )}
        <Button
          onClick={this.onSubmit}
          disabled={tiers.available.length > 100 && !!this.state.title}
        >
          Submit
        </Button>
        <Input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <div className="tierlist">
          <div className="tierlist-rows">
            <Tier
              tier="ss"
              gods={tiers.ss}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
            <Tier
              tier="s+"
              gods={tiers["s+"]}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
            <Tier
              tier="s"
              gods={tiers.s}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
            <Tier
              tier="a+"
              gods={tiers["a+"]}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
            <Tier
              tier="a"
              gods={tiers.a}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
            <Tier
              tier="b+"
              gods={tiers["b+"]}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
            <Tier
              tier="b"
              gods={tiers.b}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
            <Tier
              tier="c"
              gods={tiers.c}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
            <Tier
              tier="d"
              gods={tiers.d}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
          </div>
          <div className="available-gods-container">
            <Tier
              available={true}
              tier="available"
              gods={tiers.available}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
          </div>
        </div>
      </div>
    );
  }
}
