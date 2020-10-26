import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";

import "./SignUpPage.scss";
import { inject } from "mobx-react";
import ErrorMessage from "../../components/ErrorMessage";

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

@inject("userStore", "routerStore")
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      fullname: "",
      number: "",
      address: "",
      postalcode: "",
      city: "",
      errorMessage: null,
    };
  }

  submit = async () => {
    const {
      username,
      password,
      email,
      fullname,
      number,
      address,
      postalcode,
      city,
    } = this.state;

    try {
      await this.props.userStore.signup(
        username,
        password,
        email,
        fullname,
        number,
        address,
        postalcode,
        city
      );
      this.props.routerStore.push("/signin");
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Join us!</Heading>
          <p>Find new employees with ease.</p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              id="outlined-name"
              label="Username"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="E-Mail"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Full Name"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ fullname: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Telephone Number"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ number: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Address - Street and number"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ address: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Postal Code / ZIP Code"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ postalcode: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="City"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ city: e.target.value })}
            />
          </div>
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              SIGN UP
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignUpPage;
