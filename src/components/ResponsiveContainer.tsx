import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { DesktopContainer, MobileContainer } from ".";
import { Gods } from "../lib/types";
import { fetchGods } from "../redux/gods";
import { AppState } from "../redux";
import { handleGods } from "../lib";
import { MaybeLoading } from "./MaybeLoading";

type Props = {
  fetchGods: () => void;
  assassins: Gods;
  hunters: Gods;
  guardians: Gods;
  mages: Gods;
  warriors: Gods;
  loading: boolean;
};

const mapStateToProps = ({ gods }: AppState) => {
  const { assassins, guardians, hunters, mages, warriors } = handleGods(
    gods.gods
  );
  return {
    assassins,
    guardians,
    hunters,
    mages,
    warriors,
    loading: gods.loading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchGods: () => {
      dispatch(fetchGods());
    }
  };
};

export const ResponsiveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends Component<Props> {
    componentDidMount() {
      this.props.fetchGods();
    }
    render() {
      const { props } = this;
      return (
        <MaybeLoading loading={props.loading}>
          <DesktopContainer
            gods={{
              assassins: props.assassins,
              guardians: props.guardians,
              hunters: props.hunters,
              mages: props.mages,
              warriors: props.warriors
            }}
          >
            {props.children}
          </DesktopContainer>
          <MobileContainer
            gods={{
              assassins: props.assassins,
              guardians: props.guardians,
              hunters: props.hunters,
              mages: props.mages,
              warriors: props.warriors
            }}
          >
            {props.children}
          </MobileContainer>
        </MaybeLoading>
      );
    }
  }
);
