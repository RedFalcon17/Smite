import { Responsive } from "semantic-ui-react";

export const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Number(Responsive.onlyTablet.minWidth) : window.innerWidth;
};
