import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Accordion, Menu, AccordionTitleProps } from "semantic-ui-react";
import { Gods } from "../lib/types";

import "./builds-accordian.css";

type Props = {
  gods: {
    assassins: Gods;
    guardians: Gods;
    hunters: Gods;
    mages: Gods;
    warriors: Gods;
  };
  closeMenu: () => void;
} & RouteComponentProps;

type State = {
  activeSubIndex: number;
};

export const BuildsAccordion = withRouter(
  class BuildsAccordion extends Component<Props, State> {
    state = {
      activeSubIndex: 0
    };

    handleSubClick = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      titleProps: AccordionTitleProps
    ) => {
      const { index } = titleProps;
      const { activeSubIndex } = this.state;
      const newIndex = activeSubIndex === index ? -1 : index;

      this.setState({ activeSubIndex: newIndex as number });
    };

    render() {
      const { props, state } = this;
      return [
        <Accordion key="1" className="builds-accordion">
          <Accordion.Title
            content="Assassin"
            onClick={this.handleSubClick}
            index={1}
            active={state.activeSubIndex === 1}
          />
          <Accordion.Content
            active={state.activeSubIndex === 1}
            content={props.gods.assassins.map(assassin => (
              <Menu.Item key={assassin.id}>
                <Link
                  to={`/gods/${assassin.id}`}
                  onClick={e => {
                    e.preventDefault();
                    const path = e.currentTarget.getAttribute("href") as string;
                    this.props.closeMenu();
                    if (path !== window.location.pathname) {
                      props.history.push(path);
                    }
                  }}
                >
                  {assassin.Name}
                </Link>
              </Menu.Item>
            ))}
          />
        </Accordion>,
        <Accordion key="2" className="builds-accordion">
          <Accordion.Title
            content="Guardian"
            onClick={this.handleSubClick}
            index={2}
            active={state.activeSubIndex === 2}
          />
          <Accordion.Content
            active={state.activeSubIndex === 2}
            content={props.gods.guardians.map(guardian => (
              <Menu.Item key={guardian.id}>
                <Link
                  to={`/gods/${guardian.id}`}
                  onClick={e => {
                    e.preventDefault();
                    const path = e.currentTarget.getAttribute("href") as string;
                    this.props.closeMenu();
                    if (path !== window.location.pathname) {
                      props.history.push(path);
                    }
                  }}
                >
                  {guardian.Name}
                </Link>
              </Menu.Item>
            ))}
          />
        </Accordion>,
        <Accordion key="3" className="builds-accordion">
          <Accordion.Title
            content="Hunter"
            onClick={this.handleSubClick}
            index={3}
            active={state.activeSubIndex === 3}
          />
          <Accordion.Content
            active={state.activeSubIndex === 3}
            content={props.gods.hunters.map(hunter => (
              <Menu.Item key={hunter.id}>
                <Link to={`/gods/${hunter.id}`}>{hunter.Name}</Link>
              </Menu.Item>
            ))}
          />
        </Accordion>,
        <Accordion key="4" className="builds-accordion">
          <Accordion.Title
            content="Mage"
            onClick={this.handleSubClick}
            index={4}
            active={state.activeSubIndex === 4}
          />
          <Accordion.Content
            active={state.activeSubIndex === 4}
            content={props.gods.mages.map(mage => (
              <Menu.Item key={mage.id}>
                <Link
                  to={`/gods/${mage.id}`}
                  onClick={e => {
                    e.preventDefault();
                    const path = e.currentTarget.getAttribute("href") as string;
                    this.props.closeMenu();
                    if (path !== window.location.pathname) {
                      props.history.push(path);
                    }
                  }}
                >
                  {mage.Name}
                </Link>
              </Menu.Item>
            ))}
          />
        </Accordion>,
        <Accordion key="5" className="builds-accordion">
          <Accordion.Title
            content="Warrior"
            onClick={this.handleSubClick}
            index={5}
            active={state.activeSubIndex === 5}
          />
          <Accordion.Content
            active={state.activeSubIndex === 5}
            content={props.gods.warriors.map(warrior => (
              <Menu.Item key={warrior.id}>
                <Link
                  to={`/gods/${warrior.id}`}
                  onClick={e => {
                    e.preventDefault();
                    const path = e.currentTarget.getAttribute("href") as string;
                    this.props.closeMenu();
                    if (path !== window.location.pathname) {
                      props.history.push(path);
                    }
                  }}
                >
                  {warrior.Name}
                </Link>
              </Menu.Item>
            ))}
          />
        </Accordion>
      ];
    }
  }
);
