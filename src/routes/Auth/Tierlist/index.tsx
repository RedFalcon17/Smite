import React from "react";
import { connect } from "react-redux";
import { User } from "firebase";
import { AppState } from "../../../redux";
import {
  withAuthorization,
  Tierlist,
  CurrentUserContext
} from "../../../components";

const condition = (currentUser: User | null) => !!currentUser;

type Props = {
  godBlips: { name: string; photo: string; tier: string }[];
};

const mapStateToProps = (state: AppState) => {
  const godBlips = state.gods.gods.map(god => ({
    name: god.Name,
    photo: god.godIcon_URL,
    tier: "available"
  }));
  return {
    godBlips
  };
};

export const AuthTierlist = connect(mapStateToProps)(
  withAuthorization(condition)((props: any) => (
    <CurrentUserContext.Consumer>
      {user => <Tierlist godBlips={props.godBlips} user={user ? user : null} />}
    </CurrentUserContext.Consumer>
  ))
);
