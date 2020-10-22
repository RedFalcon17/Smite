import React from "react";
import { Item } from "../lib/types";

import "./build-slot.css";

type Props = {
  category: "final" | "starter" | "relics";
  item: Item | null;
  slot: number;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    category: "final" | "starter" | "relics"
  ) => void;
  onDoubleClick: (item: Item, category: "final" | "starter" | "relics") => void;
};

export const BuildSlot = (props: Props) => {
  return (
    <div
      className="item-slot"
      onDragOver={props.onDragOver}
      onDragStart={e =>
        props.item ? props.onDragStart(e, props.item.DeviceName) : () => {}
      }
      onDrop={e => props.onDrop(e, props.category)}
      onDoubleClick={() =>
        props.item ? props.onDoubleClick(props.item, props.category) : () => {}
      }
    >
      {props.item && props.item ? (
        <img src={props.item.itemIcon_URL} alt={props.item.DeviceName} />
      ) : null}
    </div>
  );
};
