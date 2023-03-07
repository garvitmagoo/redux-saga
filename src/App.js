import React, { Component } from "react";
import { connect } from "react-redux";
import UsersList from "./components/UsersList";
import NewUserForm from "./components/NewUserForm";
import { createUserRequest, deleteUserRequest, getUsersRequest, userError } from "./actions/users";
import { Alert } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.getUsersRequest();
  }

  handleSubmit = (firstName, lastName) => {
    console.log(firstName, lastName);
    this.props.createUserRequest({ firstName, lastName });
  };

  handleDeleteUser = (id) => {
    this.props.deleteUserRequest({ id });
  };

  handleCloseAlert = () => {
    this.props.userError({error: ''})
  }

  render() {
    const users = this.props.users;
    return (
      <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
        <Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert} >
        {this.props.users.error}
        </Alert>
        <NewUserForm onSubmit={this.handleSubmit} />
        <UsersList users={users.items} onDeleteUser={this.handleDeleteUser} />
      </div>
    );
  }
}

export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  userError
})(App);
