import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Fab, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import styled from "styled-components";
import Application from "../../components/Application";
import ApplicationsFilters from "../../components/ApplicationsFilters";

const ApplicationsWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const ApplicationsHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  width: 100%;
  color: #edf4ff;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ApplicationsContainer = styled.div`
  padding-top: 20px;
`;

const EmptyApplicationsPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;

  .signOutIcon {
    fill: #edf4ff;
  }
`;

@inject("applicationsStore", "routerStore", "userStore")
@observer
class ApplicationsPage extends Component {
  componentDidMount() {
    this.props.applicationsStore.fetchApplications();
  }

  handleSignOut = () => {
    const { userStore, applicationsStore, routerStore } = this.props;
    userStore.signout();
    applicationsStore.resetApplications();
    routerStore.push("/signin");
  };

  renderApplications = () => {
    const { applicationsStore } = this.props;

    if (!applicationsStore.applications.length) {
      return (
        <EmptyApplicationsPlaceholder>
          No applications available. Create a job ad?
        </EmptyApplicationsPlaceholder>
      );
    }

    return applicationsStore.applications.map((application) => (
      <Application
        key={application.id}
        id={application.id}
        title={application.title}
        description={application.description}
        status={application.status}
      />
    ));
  };

  render() {
    return (
      <ApplicationsWrapper>
        <ApplicationsHeader>
          <Title>List of Applications</Title>

          <CreateButtonContainer>
            <Fab
              variant="extended"
              onClick={() =>
                this.props.routerStore.push("/applications/create")
              }
            >
              <AddIcon />
              Create Job Ad
            </Fab>

            <SignOutIconContainer>
              <IconButton onClick={this.handleSignOut}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
          </CreateButtonContainer>
        </ApplicationsHeader>

        <ApplicationsFilters />

        <ApplicationsContainer>
          {this.renderApplications()}
        </ApplicationsContainer>
      </ApplicationsWrapper>
    );
  }
}

export default ApplicationsPage;
