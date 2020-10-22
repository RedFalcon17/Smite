import React from "react";
import { Item } from "../lib/types";

type Props = {
  item: Item | null;
};

export const DisplayBuildSlot = (props: Props) => {
  return (
    <div className="display-build-slot">
      {props.item && props.item ? (
        <img src={props.item.itemIcon_URL} alt={props.item.DeviceName} />
      ) : null}
    </div>
  );
};
