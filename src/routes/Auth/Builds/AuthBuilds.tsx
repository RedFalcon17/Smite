import React, { Component } from "react";
import { User } from "firebase";
import { Message } from "semantic-ui-react";
import { BuildSlot, CurrentUserContext } from "../../../components";
import { Item, God, Build } from "../../../lib/types";
import { RouteComponentProps } from "react-router";
import { Firebase, API } from "../../../lib";
import { Form, Input, TextAreaProps } from "semantic-ui-react";

type Props = {
  fetchItems: () => void;
  items: Item[];
  loading: boolean;
  currentUser: User | null;
} & RouteComponentProps & { firebase: Firebase };

type State = {
  god: number | null;
  title: string;
  subtitle: string;
  explanation: string;
  final: Item[];
  starter: Item[];
  relics: Item[];
  items: Item[];
  message: string;
  messageType: "success" | "error" | null;
  build: Build | null;
};

class Builds extends Component<any, State> {
  state = {
    god: null,
    title: "",
    subtitle: "",
    explanation: "",
    final: [],
    starter: [],
    relics: [],
    items: [],
    message: "",
    messageType: null,
    build: null
  };

  componentDidMount() {
    this.props.fetchItems();
    if (this.props.match.params.id) {
      this.fetchBuild(this.props.match.params.id);
    }
  }

  fetchBuild = async (buildId: string) => {
    try {
      const build = (await API.get<Build>(`/build/${buildId}`)).data;
      this.setState({
        title: build.title,
        subtitle: build.subtitle,
        explanation: build.subtitle,
        final: build.final,
        starter: build.final,
        relics: build.relics,
        god: build.god_id
      });
    } catch (error) {
      console.error(error);
    }
  };

  filterList = (event: React.ChangeEvent<HTMLInputElement>) => {
    var updatedList: Item[] = this.props.items;
    updatedList = updatedList.filter(
      item =>
        item.DeviceName.toLowerCase().search(
          event.target.value.toLowerCase()
        ) !== -1
    );
    this.setState({ items: updatedList });
  };

  onDragStart = (
    e: React.DragEvent<HTMLImageElement | HTMLDivElement>,
    id: string
  ) => {
    console.log(id);
    e.dataTransfer.setData("id", id);
  };

  onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  onDrop = (
    e: React.DragEvent<HTMLDivElement>,
    category: "final" | "starter" | "relics"
  ) => {
    let id = e.dataTransfer.getData("id");
    const item: Item = this.props.items.find(
      (item: Item) => item.DeviceName === id
    );
    if (category === "relics") {
      if (item.Type === "Active") {
        this.setState(state => {
          const current = state[category];
          current.push(item);
          return {
            [category]: current
          } as Pick<State, "relics">;
        });
      }
    } else if (item.ItemId === 7621 || item.ItemId === 7622) {
      this.setState(state => {
        const current = state[category];
        current.push(item);
        return {
          [category]: current
        } as Pick<State, "final" | "starter" | "relics">;
      });
    } else {
      this.setState(state => {
        const current = state[category].filter(
          present => present.ItemId !== item.ItemId
        );
        current.push(item);
        return { [category]: current } as Pick<
          State,
          "final" | "starter" | "relics"
        >;
      });
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ [e.target.name]: e.target.value } as Pick<
      State,
      "title" | "subtitle"
    >);

  onTextAreaChange = (
    e: React.FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ) => this.setState({ explanation: data.value } as Pick<State, "explanation">);

  onSubmit = async () => {
    const { state } = this;
    const build = {
      god_id: state.god,
      title: state.title,
      subtitle: state.subtitle,
      explanation: state.explanation,
      final: state.final,
      starter: state.starter,
      relics: state.relics
    };
    let authToken;
    if (this.props.match.params.id) {
      try {
        authToken = await this.props.user
          .getIdToken()
          .then((token: any) => token);
        await API.put(
          `/build/${this.props.match.params.id}`,
          JSON.stringify(build),
          { Authorization: `Bearer ${authToken}` }
        );
        this.setState({
          message: "Build successfully updated.",
          messageType: "success"
        });
      } catch (error) {
        this.setState({
          message:
            "An error occured and the build could not be updated. Try again later.",
          messageType: "error"
        });
      }
    } else {
      try {
        authToken = await this.props.user
          .getIdToken()
          .then((token: any) => token);
        await API.post("/builds", JSON.stringify(build), {
          Authorization: `Bearer ${authToken}`
        });
        this.setState({
          message: "Build successfully created.",
          messageType: "success"
        });
      } catch (error) {
        this.setState({
          message:
            "An error occured and the build could not be created. Try again later.",
          messageType: "error"
        });
      }
    }
  };

  onDoubleClick = (item: Item, category: "final" | "starter" | "relics") => {
    const itemCount = this.state[category].filter(
      (i: Item) => i.ItemId === item.ItemId
    ).length;
    if (itemCount > 1) {
      const current: any[] = [...this.state[category]];
      const pos = current.map((e: Item) => e.ItemId).indexOf(item.ItemId);
      current.splice(pos, 1);
      this.setState({ [category]: current } as Pick<
        State,
        "final" | "starter" | "relics"
      >);
    } else {
      const removeItemList: any[] = this.state[category].filter(
        (i: Item) => i.ItemId !== item.ItemId
      );
      this.setState({ [category]: removeItemList } as Pick<
        State,
        "final" | "starter" | "relics"
      >);
    }
  };

  render() {
    const { state } = this;

    const final: any[] = [],
      starter: any[] = [],
      relics: any[] = [];

    for (let i = 0; i < 6; i++) {
      if (i < 6) {
        if (state.final[i]) {
          final.push(state.final[i]);
        } else {
          final.push(null);
        }
        if (state.starter[i]) {
          starter.push(state.starter[i]);
        } else {
          starter.push(null);
        }
      }
    }

    for (let i = 0; i < 2; i++) {
      if (i < 2) {
        if (state.relics[i]) {
          relics.push(state.relics[i]);
        } else {
          relics.push(null);
        }
      }
    }

    return (
      <>
        {state.message && (
          <Message
            content={state.message}
            negative={state.messageType === "error"}
            success={state.messageType === "success"}
            onDismiss={() => this.setState({ message: "" })}
          />
        )}
        <div className="auth-builds">
          <Form className="builds-form" onSubmit={this.onSubmit}>
            <Form.Input
              name="title"
              placeholder="Title"
              onChange={this.onChange}
              value={state.title}
            />
            <Form.Select
              value={this.state.god || ""}
              placeholder="God"
              options={this.props.gods.map((god: God) => ({
                text: god.Name,
                value: god.id
              }))}
              search
              onChange={(_, data) =>
                this.setState({ god: data.value } as Pick<State, "god">)
              }
            />
            <Form.Input
              name="subtitle"
              placeholder="Sub Title"
              onChange={this.onChange}
              value={state.subtitle}
            />
            <div className="item-row">
              <h4 className="white">Final Items:</h4>
              <div className="item-row-wrapper">
                {final.map((item, i) => (
                  <BuildSlot
                    key={i}
                    category="final"
                    slot={i + 1}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}
                    onDragStart={this.onDragStart}
                    item={item ? item : null}
                    onDoubleClick={this.onDoubleClick}
                  />
                ))}
              </div>
            </div>
            <div className="item-row">
              <h4 className="white">Starter Items:</h4>
              <div className="item-row-wrapper">
                {starter.map((item, i) => (
                  <BuildSlot
                    key={i}
                    category="starter"
                    slot={i + 1}
                    onDragOver={this.onDragOver}
                    onDragStart={this.onDragStart}
                    onDrop={this.onDrop}
                    item={item ? item : null}
                    onDoubleClick={this.onDoubleClick}
                  />
                ))}
              </div>
            </div>
            <div className="item-row">
              <h4 className="white">Relics:</h4>
              <div className="item-row-wrapper">
                {relics.map((item, i) => (
                  <BuildSlot
                    key={i}
                    category="relics"
                    slot={i + 1}
                    onDragOver={this.onDragOver}
                    onDragStart={this.onDragStart}
                    onDrop={this.onDrop}
                    item={item ? item : null}
                    onDoubleClick={this.onDoubleClick}
                  />
                ))}
              </div>
            </div>
            <Form.TextArea
              placeholder="Explanation"
              value={state.explanation}
              onChange={this.onTextAreaChange}
            />
            <Form.Button
              disabled={
                state.title === "" ||
                state.subtitle === "" ||
                state.explanation === "" ||
                state.relics.length !== 2 ||
                state.final.length !== 6 ||
                state.starter.length === 0 ||
                state.god === null
              }
              type="submit"
            >
              {this.props.match.params.id ? "Save" : "Submit"}
            </Form.Button>
          </Form>
          <div className="item-search">
            <Input
              type="text"
              placeholder="Search"
              fluid
              onChange={this.filterList}
            />
            <div className="item-list">
              {this.state.items.length > 0 &&
                this.state.items.map((item: Item) => (
                  <img
                    onDragStart={e => this.onDragStart(e, item.DeviceName)}
                    key={item.ItemId}
                    src={item.itemIcon_URL}
                    height={40}
                    width={40}
                    alt={item.DeviceName}
                  />
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const AuthBuilds = (props: any) => {
  return (
    <CurrentUserContext.Consumer>
      {user => {
        console.log(user ? user.getIdToken().then(token => token) : "nope");
        return <Builds user={user ? user : null} {...props} />;
      }}
    </CurrentUserContext.Consumer>
  );
};
