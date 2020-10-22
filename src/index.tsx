import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "./font.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { FirebaseContext } from "./components/FirebaseContext";
import { Firebase } from "./lib";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("__root")
);

serviceWorker.register();
