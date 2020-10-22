/* eslint-disable import/first */
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "connected-react-router";
import promise from "redux-promise-middleware";

export const history = createHistory();

import { rootReducer } from "./redux";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), promise))
);
