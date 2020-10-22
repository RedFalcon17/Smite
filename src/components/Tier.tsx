import React from "react";

import "./tier.css";

type Props = {
  available?: boolean;
  tier: string;
  gods: any;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, tier: string) => void;
};

export const Tier = (props: Props) => {
  if (props.available) {
    return (
      <div
        onDragOver={e => props.onDragOver(e)}
        onDrop={e => props.onDrop(e, props.tier)}
        className="tier available-gods"
      >
        <span>{props.tier.toUpperCase()}</span>

        <div className="tier-container ">{props.gods}</div>
      </div>
    );
  } else {
    return (
      <div
        onDragOver={e => props.onDragOver(e)}
        onDrop={e => props.onDrop(e, props.tier)}
        className="tier"
      >
        <span>{props.tier.toUpperCase()}</span>

        <div className="tier-container">
          {props.gods.length !== 0 ? props.gods : "Empty"}
        </div>
      </div>
    );
  }
};
