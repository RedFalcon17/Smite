import React, { Component } from "react";
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Accordion,
  AccordionTitleProps
} from "semantic-ui-react";
import { BuildsAccordion } from ".";
import { Gods } from "../lib/types";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Footer } from "./Footer";

import "./mobile.css";

type State = {
  sidebarOpened: boolean;
  activeIndex: number;
  activeSubIndex: number;
};

type Props = {
  gods: {
    assassins: Gods;
    guardians: Gods;
    hunters: Gods;
    mages: Gods;
    warriors: Gods;
  };
} & RouteComponentProps;

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Number(Responsive.onlyTablet.minWidth) : window.innerWidth;
};

export const MobileContainer = withRouter(
  class MobileContainer extends Component<Props, State> {
    state = {
      sidebarOpened: false,
      activeIndex: 0,
      activeSubIndex: 0
    };

    handleSidebarHide = () => this.setState({ sidebarOpened: false });

    handleToggle = () => this.setState({ sidebarOpened: true });

    handleClick = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      titleProps: AccordionTitleProps
    ) => {
      const { index } = titleProps;
      const { activeIndex } = this.state;
      const newIndex = activeIndex === index ? -1 : index;

      this.setState({ activeIndex: newIndex as number });
    };

    closeAndRoute = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const path = e.currentTarget.getAttribute("href") as string;
      this.handleSidebarHide();
      this.props.history.push(path);
    };

    render() {
      const { props, state } = this;

      return (
        <Responsive
          getWidth={getWidth}
          minWidth={100}
          maxWidth={768}
          className="ss-dark-navy mobile"
        >
          <Sidebar
            as={Menu}
            animation="push"
            onHide={this.handleSidebarHide}
            vertical
            visible={state.sidebarOpened}
            className="ss-navy mobile-menu"
          >
            <Menu.Item active>
              <Link to="/" onClick={this.closeAndRoute}>
                HOME
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Accordion>
                <Accordion.Title index={1} onClick={this.handleClick}>
                  <p className="white">BUILDS</p>
                </Accordion.Title>
                <Accordion.Content
                  active={state.activeIndex === 1}
                  content={
                    <BuildsAccordion
                      gods={props.gods}
                      closeMenu={this.handleSidebarHide}
                    />
                  }
                />
              </Accordion>
            </Menu.Item>
            <Menu.Item>
              <Link to="/tierlists" onClick={this.closeAndRoute}>
                TIER LISTS
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about" onClick={this.closeAndRoute}>
                ABOUT
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/giveaways" onClick={this.closeAndRoute}>
                <span className="orange">GIVEAWAY</span>
              </Link>
            </Menu.Item>
          </Sidebar>
          <Segment textAlign="center" inverted className="ss-navy" vertical>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>Smite Source</Menu.Item>
                <Menu.Item onClick={this.handleToggle} position="right">
                  <Icon name="sidebar" size="big" />
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
          {React.cloneElement(props.children as React.ReactElement, props.gods)}
          <Footer />
        </Responsive>
      );
    }
  }
);
