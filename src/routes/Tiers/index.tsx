import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider } from "semantic-ui-react";
import { API } from "../../lib";
import { MaybeLoading } from "../../components";
import List from "../../assets/clipboard-list.svg";
import "./tiers.css";

export function Tiers() {
  const [loading, setLoading] = useState(false);
  const [tierlist, setTierlists] = useState([]);

  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    const fetchTierlists = async () => {
      const result = await API.get<any>("/tierlists");
      if (!didCancel) {
        setTierlists(result.data);
        setLoading(false);
      }
    };
    try {
      fetchTierlists();
    } catch (error) {
      console.error(error);
    }
    return () => {
      didCancel = true;
    };
  }, []);
  return (
    <MaybeLoading loading={loading}>
      <div className="tiers">
        <div className="title-bar">
          <Divider horizontal>
            <h2 className="white caps">Tier Lists</h2>
          </Divider>
        </div>
        <div className="list-tiers">
          {tierlist ? (
            tierlist.map((list: { title: string; id: string }) => (
              <Link
                to={`/tierlists/${list.id}`}
                key={list.id}
                className="list-tier-card"
              >
                <img src={List} alt="list" width={30} />
                <h4 className="yellow">{list.title}</h4>
                <p>September 19, 2019</p>
              </Link>
            ))
          ) : (
            <h1>Error</h1>
          )}
        </div>
      </div>
    </MaybeLoading>
  );
}
