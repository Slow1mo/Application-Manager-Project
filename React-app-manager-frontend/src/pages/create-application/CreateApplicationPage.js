import React, { Component } from "react";
import { TextField, FormControl, Button } from "@material-ui/core";
import styled from "styled-components";
import { inject } from "mobx-react";
import ErrorMessage from "../../components/ErrorMessage";

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

@inject("applicationsStore", "routerStore")
class CreateApplicationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      status: "OPEN",
      errorMessage: null,
    };
  }

  handleSubmitApplication = async () => {
    const { applicationsStore, routerStore } = this.props;
    const { title, description } = this.state;

    try {
      await applicationsStore.createApplication(title, description);
      routerStore.push("/applications");
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    return (
      <FormWrapper>
        <FormContainer>
          <h1>Create a new job ad</h1>
          <p>Provide information about the job ad.</p>

          {this.state.errorMessage && (
            <ErrorMessage message={this.state.errorMessage} />
          )}

          <FormControl fullWidth>
            <TextField
              label="Title"
              placeholder="Title"
              margin="normal"
              variant="outlined"
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Description"
              placeholder="Description"
              multiline
              rows="8"
              margin="normal"
              variant="outlined"
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </FormControl>

          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmitApplication}
          >
            CREATE JOB AD
          </Button>
        </FormContainer>
      </FormWrapper>
    );
  }
}

export default CreateApplicationPage;
