import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import { inject } from "mobx-react";

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

@inject("applicationsStore")
class Application extends Component {
  deleteApplication = () => {
    this.props.applicationsStore.deleteApplication(this.props.id);
  };

  handleStatusChange = (e) => {
    this.props.applicationsStore.updateApplicationStatus(
      this.props.id,
      e.target.value
    );
  };

  render() {
    const { title, description } = this.props;

    return (
      <CardContainer>
        <Card>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            {description}
          </CardContent>
          <CardActions style={{ padding: "14px" }} disableSpacing>
            <Grid
              justify="space-between" // Add it here :)
              container
            >
              <Grid item>
                <FormControl style={{ width: "140px" }}>
                  <Select
                    value={this.props.status}
                    onChange={this.handleStatusChange}
                    displayEmpty
                  >
                    <MenuItem value={"OPEN"}>Open for Applications</MenuItem>
                    <MenuItem value={"IN_PROGRESS"}>
                      Screening applicants
                    </MenuItem>
                    <MenuItem value={"CLOSED"}>
                      Closed for Applications
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <IconButton onClick={this.deleteApplication}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </CardContainer>
    );
  }
}

export default Application;
