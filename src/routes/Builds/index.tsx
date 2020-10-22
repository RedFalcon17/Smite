import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { GodBuild } from "./GodBuild";
import { API } from "../../lib";
import { Build } from "../../lib/types";
import { MaybeLoading } from "../../components";

type Props = RouteComponentProps<{ godId: string; buildId: string }>;

export const GodBuildContainer = (props: Props) => {
  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    const fetchBuild = async () => {
      const result = await API.get<Build>(
        `/build/${props.match.params.buildId}`
      );
      if (!didCancel) {
        setBuild(result.data);
        setLoading(false);
      }
    };
    try {
      fetchBuild();
    } catch (error) {
      console.error(error);
    }
    return () => {
      didCancel = true;
    };
  }, [props.match.params.buildId, props.match.params.godId]);
  return (
    <MaybeLoading loading={loading}>
      <GodBuild godId={props.match.params.godId} build={build} />
    </MaybeLoading>
  );
};
