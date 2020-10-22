import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Divider } from "semantic-ui-react";
import { API, ImageMap } from "../../lib";
import { AppState } from "../../redux";
import { God, Build } from "../../lib/types";
import { MaybeLoading } from "../../components";

import "./gods.css";

type Props = {
  god: God;
} & RouteComponentProps<{ id: string }>;

const mapStateToProps = (state: AppState, ownProps: Props) => {
  const god = state.gods.gods.filter(
    god =>
      ownProps.match &&
      ownProps.match.params &&
      String(god.id) === ownProps.match.params.id
  )[0];
  return { god };
};

export const Gods = connect(mapStateToProps)(function Gods(props: Props) {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    const fetchBuilds = async () => {
      const result = await API.get<Build[]>(`/builds/${props.match.params.id}`);
      if (!didCancel) {
        setBuilds(result.data);
        setLoading(false);
      }
    };
    try {
      fetchBuilds();
    } catch (error) {
      console.error(error);
    }
    return () => {
      didCancel = true;
    };
  }, [props.match.params.id]);

  const image = props.god && ImageMap(props.god.Name);
  return (
    <MaybeLoading loading={loading}>
      {props.god && (
        <div className="gods-page">
          <div className="banner">
            <img
              src={`https://web2.hirez.com/smite-media//wp-content/uploads/${image.date}/${image.name}.jpg`}
              alt=""
            />
            <h1 className="white">{props.god.Name}</h1>
            <h3 className="orange">{props.god.Title}</h3>
          </div>
          {builds.length > 0 ? (
            <>
              <div className="page-break">
                <Divider horizontal>
                  <h2 className="white caps">Builds</h2>
                </Divider>
              </div>
              <div className="build-card-list">
                {builds.map(build => (
                  <a
                    key={build.id}
                    className="build-card"
                    href={`/gods/${props.match.params.id}/builds/${build.id}`}
                  >
                    <i
                      className={`smite icon-${props.god.Roles.trim().toLowerCase()} center white`}
                    />
                    <h4 className="yellow caps center">{build.title}</h4>
                    <h5 className="white center normal">{build.subtitle}</h5>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <h1 className="white no-builds">No builds yet</h1>
          )}
        </div>
      )}
    </MaybeLoading>
  );
});
