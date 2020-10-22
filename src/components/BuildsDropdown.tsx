import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

import "./builds-dropdown.css";

export function BuildsDropdown(props: any) {
  return (
    <Dropdown as="li" text="BUILDS" className="link item">
      <Dropdown.Menu>
        <Dropdown.Item>
          <Dropdown text="Assassins" className="role">
            <Dropdown.Menu className="gods">
              {props.gods.assassins.map((assassin: any) => (
                <Dropdown.Item
                  key={assassin.id}
                  as={Link}
                  to={`/gods/${assassin.id}`}
                  className="subnav"
                >
                  {assassin.Name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown text="Hunters" className="role">
            <Dropdown.Menu className="gods">
              {props.gods.hunters.map((hunter: any) => (
                <Dropdown.Item
                  key={hunter.id}
                  as={Link}
                  to={`/gods/${hunter.id}`}
                >
                  {hunter.Name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown text="Guardians" className="role">
            <Dropdown.Menu className="gods">
              {props.gods.guardians.map((guardian: any) => (
                <Dropdown.Item
                  key={guardian.id}
                  as={Link}
                  to={`/gods/${guardian.id}`}
                >
                  {guardian.Name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown text="Mages" className="role">
            <Dropdown.Menu className="gods">
              {props.gods.mages.map((mage: any) => (
                <Dropdown.Item key={mage.id} as={Link} to={`/gods/${mage.id}`}>
                  {mage.Name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
        <Dropdown.Item>
          <Dropdown text="Warriors" className="role">
            <Dropdown.Menu className="gods">
              {props.gods.warriors.map((warrior: any) => (
                <Dropdown.Item
                  key={warrior.id}
                  as={Link}
                  to={`/gods/${warrior.id}`}
                >
                  {warrior.Name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
