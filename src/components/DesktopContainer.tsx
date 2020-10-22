import React, { Component } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";
import { BuildsDropdown } from "../components";
import Logo from "../assets/Logo.svg";
import { getWidth } from "../lib/getWidth";
import { Gods } from "../lib/types";
import { Footer } from "./Footer";
import { TwitchBubble } from "./TwitchBubble";

import "./desktop.css";

type Props = {
  gods: {
    assassins: Gods;
    guardians: Gods;
    hunters: Gods;
    mages: Gods;
    warriors: Gods;
  };
} & RouteComponentProps;

type State = {
  fixed: boolean;
};

export const DesktopContainer = withRouter(
  class DesktopContainer extends Component<Props, State> {
    state = {
      fixed: false
    };

    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });

    render() {
      const { props, state } = this;

      return (
        <Responsive
          getWidth={getWidth}
          minWidth={769}
          className="ss-dark-navy desktop"
        >
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment textAlign="center" vertical className="ss-dark-navy">
              <Menu
                className="ss-navy ss-nav"
                fixed={state.fixed ? "top" : undefined}
                pointing={!state}
                secondary={!state}
                size="large"
              >
                <Container>
                  <Menu.Item as="li" className="ss-logo">
                    <Link to="/">
                      <img src={Logo} width="275" alt="Smite Source" />
                    </Link>
                  </Menu.Item>
                  <div className="menu-links">
                    <Menu.Item as={Link} to="/" className="white">
                      HOME
                    </Menu.Item>
                    <BuildsDropdown gods={props.gods} />
                    <Menu.Item as={Link} to="/tierlists" className="white">
                      TIER LISTS
                    </Menu.Item>
                    <Menu.Item as={Link} to="/about" className="white">
                      ABOUT
                    </Menu.Item>
                    <Menu.Item as={Link} to="/giveaways" className="white">
                      GIVEAWAYS
                    </Menu.Item>
                  </div>
                </Container>
              </Menu>
            </Segment>
          </Visibility>
          <main>{props.children}</main>
          {props.location.pathname !== "/" && <TwitchBubble />}
          <Footer />
        </Responsive>
      );
    }
  }
);
