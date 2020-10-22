import React, { PropsWithChildren, ReactElement } from "react";

import "./build-row.css";

type Props = PropsWithChildren<{ category: "final" | "starter" | "relics" }>;

export const BuildRow = (props: Props) => {
  return (
    <div className="build-row">
      {React.cloneElement(
        props.children as ReactElement<any, string>,
        props.category as any
      )}
    </div>
  );
};
