import { FluxStandardAction } from "redux-promise-middleware";
import { API } from "../lib";
import { Gods } from "../lib/types";

export const FETCH_GODS_TYPE = "FETCH_GODS";

export type GodsState = {
  gods: Gods;
  error: any;
  loading: boolean;
};

const initialState: GodsState = {
  gods: [],
  error: null,
  loading: false
};

export const fetchGods = () => ({
  type: FETCH_GODS_TYPE,
  async payload() {
    const gods = (await API.get<Gods>("/gods")).data;
    return gods;
  }
});

export default (state = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case `${FETCH_GODS_TYPE}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${FETCH_GODS_TYPE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        gods: action.payload
      };
    case `${FETCH_GODS_TYPE}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
