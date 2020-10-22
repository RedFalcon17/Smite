import React, { PropsWithChildren } from "react";
import Logo from "../assets/Logo.svg";
import PulseLoader from "react-spinners/PulseLoader";

import "./maybe-loading.css";

type Props = PropsWithChildren<{ loading: boolean }>;

export const MaybeLoading = (props: Props) =>
  props.loading ? (
    <div className="ss-dark-navy maybe-loading">
      <img src={Logo} width="275" alt="Smite Source" />
      <PulseLoader size={30} color="white" />
    </div>
  ) : (
    <>{props.children}</>
  );
