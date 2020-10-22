import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { API } from "../../lib";
import { MaybeLoading } from "../../components";

import "./list.css";

type Props = RouteComponentProps<{ id: string }>;

export const List = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<{
    title: string;
    gods: { name: string; photo: string; tier: string }[];
  } | null>(null);
  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    const fetchList = async () => {
      const result = await API.get<any>(`/tierlists/${props.match.params.id}`);
      if (!didCancel) {
        setList(result.data);
        setLoading(false);
      }
    };
    fetchList();
    return () => {
      didCancel = true;
    };
  }, [props.match.params.id]);

  const tiers: {
    [key: string]: { name: string; photo: string; tier: string }[];
  } = {
    ss: [],
    "s+": [],
    s: [],
    "a+": [],
    a: [],
    "b+": [],
    b: [],
    c: [],
    d: [],
    available: []
  };

  list && list.gods.forEach(god => tiers[god.tier].push(god));

  return (
    <MaybeLoading loading={loading}>
      {list && (
        <>
          <div className="list">
            <h2 className="white caps">{list.title}</h2>
          </div>
          <div className="list-group">
            {tiers &&
              Object.keys(tiers).map(tier => (
                <div key={tier} className="list-row">
                  <span className="list-title white center">
                    <h2>{tier === "available" ? "NA" : tier.toUpperCase()}</h2>
                  </span>
                  <div className="list-tier">
                    {tiers[tier].map(god => (
                      <img key={god.name} src={god.photo} alt="" />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </MaybeLoading>
  );
};
