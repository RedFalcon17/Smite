import React from "react";
import { Item } from "../lib/types";

import "./build-item.css";

type Props = {
  item: Item;
};

export const BuildItem = ({ item }: Props) => {
  return (
    <div className="build-item">
      <img
        src={item.itemIcon_URL}
        height={30}
        width={30}
        alt={item.DeviceName}
      />
    </div>
  );
};
