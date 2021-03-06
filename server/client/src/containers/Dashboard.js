import React, { Component, Fragment } from "react";
import {connect} from 'react-redux';
import * as actions from '../actions';
import { Segment, Button } from 'semantic-ui-react';
import ModalWindow from '../components/modal';

class Dashboard extends Component {
  state = { modalOpen: false };

  render() {
  const { auth, deleteUser, logoutUser } = this.props;
  const user = auth.user;
    return(
      <Fragment>
        <h2>
         {`Hello ${user.name}`}
        </h2>
        <Segment>
          <Button onClick={logoutUser}>Sign out</Button>
          <Button onClick={() => this.setState({ modalOpen: true })}>Delete profile</Button>
        </Segment>
        <Segment>
          <img alt='profile photo' src={user.photos.length && user.photos[0].value} />
        </Segment>
        <ModalWindow
         open={this.state.modalOpen}
         onClose={() => this.setState({ modalOpen: false})}
         headertext={'Delete Your Account'}
         contenttext={'Are you sure you want to delete your account?'}
         onNegative={() => this.setState({ modalOpen: false})}
         onPositive={() => deleteUser()}
         />
      </Fragment>
    )
  }

};


function mapStateToProps({ auth }) {
  return {auth};
}


export default connect(mapStateToProps, actions)(Dashboard);
