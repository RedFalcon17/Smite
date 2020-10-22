import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { withFirebase } from "../../../components";
import { Firebase } from "../../../lib";

import "./signin.css";

type Props = { firebase: Firebase };

type State = {
  email: string;
  password: string;
};

const initialState = {
  email: "",
  password: ""
};

class SignInForm extends Component<Props, State> {
  state = {
    ...initialState
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignItWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...initialState });
        // TODO: Toggle Admin Dashboard
      });
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value } as Pick<
      State,
      keyof State
    >);
  };

  render() {
    const { state } = this;

    return (
      <div className="signin">
        <h1 className="white">Auth</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            name="email"
            value={state.email}
            onChange={this.onChange}
            type="email"
            placeholder="Email"
            className="sign-input"
          />
          <Form.Input
            name="password"
            value={state.password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            className="sign-input"
          />
          <Form.Button
            fluid
            className="sign-input"
            type="submit"
            disabled={state.email === "" || state.password === ""}
          >
            Sign In
          </Form.Button>
        </Form>
      </div>
    );
  }
}

export const SignIn = withFirebase(SignInForm);
