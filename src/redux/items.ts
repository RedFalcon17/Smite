import { FluxStandardAction } from "redux-promise-middleware";
import { API } from "../lib";
import { Item } from "../lib/types";

export const FETCH_ITEMS_TYPE = "FETCH_ITEMS";

export type ItemsState = {
  items: Item[];
  error: any;
  loading: boolean;
};

const initialState: ItemsState = {
  items: [],
  error: null,
  loading: false
};

export const fetchItems = () => ({
  type: FETCH_ITEMS_TYPE,
  async payload() {
    const items = (await API.get<Item[]>("/items")).data;
    return items;
  }
});

export default (state = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case `${FETCH_ITEMS_TYPE}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${FETCH_ITEMS_TYPE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case `${FETCH_ITEMS_TYPE}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
