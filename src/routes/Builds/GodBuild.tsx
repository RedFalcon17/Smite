import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Confirm } from "semantic-ui-react";
import { withRouter, RouteComponentProps } from "react-router";
import Media from "react-media";
import { ImageMap, API } from "../../lib";
import { Build, God } from "../../lib/types";
import { AppState } from "../../redux";
import { CurrentUserContext } from "../../components";

import "./god-build.css";

type OwnProps = {
  build: Build | null;
  godId: string;
} & RouteComponentProps;

type ComponentProps = {
  build: Build | null;
  god: God | undefined;
} & RouteComponentProps;

export const GodBuild = withRouter(
  connect(
    (state: AppState, ownProps: OwnProps) => ({
      god: state.gods.gods.find(god => god.id === Number(ownProps.godId))
    }),
    null,
    (stateProps, dispatchProps, ownProps) => ({
      god: stateProps.god,
      build: ownProps.build,
      history: ownProps.history
    })
  )((props: ComponentProps) => {
    const [confirm, handleConfirm] = useState(false);
    const image =
      props.god !== undefined ? ImageMap(props.god.Name) : ImageMap("");
    console.log(props);
    return props.build ? (
      <div>
        <CurrentUserContext.Consumer>
          {user =>
            user ? (
              <Button.Group style={{ margin: "10px 0" }}>
                <Button
                  onClick={() => {
                    if (props.build) {
                      props.history.push(`/auth/builds/${props.build.id}`);
                    }
                  }}
                >
                  Edit
                </Button>
                <Button color="red" onClick={() => handleConfirm(true)}>
                  Delete
                </Button>
                <Confirm
                  open={confirm}
                  onCancel={() => handleConfirm(false)}
                  onConfirm={async () => {
                    if (props.build) {
                      let authToken;
                      try {
                        authToken = await user
                          .getIdToken()
                          .then(token => token);
                        console.log(authToken);
                        await API.delete(`/build/${props.build.id}`, {
                          Authorization: `Bearer ${authToken}`
                        });
                        props.history.push("/");
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }}
                />
              </Button.Group>
            ) : (
              "none"
            )
          }
        </CurrentUserContext.Consumer>
        {props.god && (
          <div className="build-banner">
            <img
              src={`https://web2.hirez.com/smite-media//wp-content/uploads/${image.date}/${image.name}.jpg`}
              width="100%"
              height="70%"
              alt=""
            />
            <h1 className="white">{props.god.Name}</h1>
            <h3 className="orange">{props.build.title}</h3>
            <h5 className="white">{props.build.subtitle}</h5>
          </div>
        )}
        <div className="build-row">
          <div className="items-container">
            <h3 className="orange items-title">Final Items:</h3>
            <div className="build-items">
              {props.build.final &&
                props.build.final.map(item => (
                  <div className="build-item" key={`final-${item.ItemId}`}>
                    <img
                      className="item-image"
                      src={item.itemIcon_URL}
                      alt=""
                    />
                    <h5 className="white item-name">{item.DeviceName}</h5>
                  </div>
                ))}
            </div>
          </div>
          <Media
            query="(min-width: 769px)"
            render={() => (
              <div className="relic-container">
                <h4 className="orange relic-title">Final Relic:</h4>
                <div className="relic-wrap">
                  {props.build && props.build.relics && (
                    <div className="relic">
                      <img
                        className="relic-image"
                        src={props.build.relics[1].itemIcon_URL}
                        width={58}
                        height={58}
                        alt=""
                      />
                      <h5 className="white relic-name">
                        {props.build.relics[1].DeviceName}
                      </h5>
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <div className="build-row">
          <div className="items-container">
            <h4 className="orange items-title">Starter Items:</h4>
            <div className="build-items starter">
              {props.build.starter &&
                props.build.starter.map((item, i) => (
                  <div
                    className="build-item"
                    key={`starter-${item.ItemId}-${i}`}
                  >
                    <img
                      className="item-image"
                      src={item.itemIcon_URL}
                      alt=""
                    />
                    <h5 className="white item-name">{item.DeviceName}</h5>
                  </div>
                ))}
            </div>
          </div>
          <Media
            query="(min-width: 769px)"
            render={() => (
              <div className="relic-container">
                <h4 className="orange relic-title-small">Starter Relic:</h4>
                <div className="relic-wrap">
                  {props.build && props.build.relics && (
                    <div className="relic">
                      <img
                        className="relic-image"
                        src={props.build.relics[0].itemIcon_URL}
                        alt=""
                      />
                      <h5 className="white relic-name">
                        {props.build.relics[0].DeviceName}
                      </h5>
                    </div>
                  )}
                </div>
              </div>
            )}
          />
          <Media
            query="(max-width:768px)"
            render={() => (
              <div>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#1f2439",
                    boxShadow: "0 3px 6px #00000040",
                    margin: "13px 0"
                  }}
                >
                  {props.build &&
                    props.build.relics.map((relic, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          textAlign: "center",
                          minHeight: 232,
                          marginTop: 13
                        }}
                      >
                        <h4 className="orange relic-title-small">
                          {i === 0 ? "Starter" : "Final"} Relic
                        </h4>
                        <div className="relic">
                          <img
                            className="relic-image"
                            src={relic.itemIcon_URL}
                            alt={relic.DeviceName}
                          />
                          <h5 className="white relic-name">
                            {relic.DeviceName}
                          </h5>
                        </div>
                      </div>
                    ))}
                </div>
                <div></div>
              </div>
            )}
          />
        </div>
        <div className="explanation-container">
          <div className="explanation">
            <h4 className="orange explanation-title">Explanation:</h4>
            <p className="white explanation-text">
              {props.build.explanation && props.build.explanation}
            </p>
          </div>
        </div>
      </div>
    ) : null;
  })
);
