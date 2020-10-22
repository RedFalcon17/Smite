import React from "react";

import "./twitch.css";

export const TwitchEmbed = () => {
  return (
    <iframe
      src="https://player.twitch.tv/?channel=weak3n&muted=true"
      height="100%"
      width="100%"
      frameBorder="0"
      scrolling="no"
      allowFullScreen={true}
      className="twitch-embed"
      title="Weak3n Twitch"
    />
  );
};
