import React from "react";
import { withFirebase } from "./FirebaseContext";
import { Firebase } from "../lib";

import "./footer.css";

type Props = {
  firebase: Firebase;
};

export const Footer = withFirebase((props: Props) => (
  <footer className="white footer">
    <p>&copy; 2019 Smite Source. All rights reserved.</p>
  </footer>
));
