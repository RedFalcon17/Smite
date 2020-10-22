import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import { TwitchEmbed } from "./TwitchEmbed";

import "./twitch-bubble.css";

export const TwitchBubble = () => {
  const [stream, setStream] = useState(true);
  return stream ? (
    <div className="twitch-window">
      <div className="twitch-window-container">
        <h6 className="white">Weak3n's Twitch</h6>
        <Icon
          name="window minimize"
          inverted
          onClick={() => {
            setStream(false);
          }}
        />
      </div>
      <div className="twitch-embed-wrapper">
        <TwitchEmbed />
      </div>
    </div>
  ) : (
    <div
      onClick={() => {
        setStream(true);
      }}
      className="twitch-bubble"
    >
      <Icon name="twitch" inverted size="big" />
    </div>
  );
};
