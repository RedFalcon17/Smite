import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "connected-react-router";
import promise from "redux-promise-middleware";
import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";

import gods, { GodsState } from "./gods";
import items, { ItemsState } from "./items";

export const history = createHistory();

export const rootReducer = combineReducers<{
  router: RouterState;
  gods: GodsState;
  items: ItemsState;
}>({
  router: connectRouter(history),
  gods,
  items
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), promise))
);

export type AppState = ReturnType<typeof rootReducer>;
