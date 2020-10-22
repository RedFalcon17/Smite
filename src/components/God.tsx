import React from "react";

type Props = {
  name: string;
  photo: string;
  currentTier: string;
  removeGod: (
    god: { name: string; photo: string; currentTier: string },
    tier: string
  ) => void;
};

export const God = (props: Props) => {
  return (
    <div className="god-container">
      <img src={props.photo} alt={props.name} />
    </div>
  );
};
