import { connect } from "react-redux";
import { User } from "firebase";
import { AuthBuilds } from "./AuthBuilds";
import { Dispatch } from "redux";
import { withAuthorization } from "../../../components";
import { AppState } from "../../../redux";
import { fetchItems } from "../../../redux/items";

import "./auth-builds.css";

const condition = (currentUser: User | null) => !!currentUser;

const mapStateToProps = ({ items, gods }: AppState) => ({
  items: items.items
    .filter(item => item.ActiveFlag === "y")
    .filter(item => item.ItemTier !== 4),
  gods: gods.gods
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchItems: () => {
      dispatch(fetchItems());
    }
  };
};

export const AuthBuildsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthorization(condition)(AuthBuilds));
