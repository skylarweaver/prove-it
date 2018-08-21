// Import React Modules
import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

// Import Scenes
import ProofListItem from './ProofListItem/ProofListItem';

// Import Components

class Home extends Component {
  render() {
    return (
      <div>
        <ProofListItem/>
      </div>
    );
  }
}

// Makes global state available in this component through props
function mapStateToProps(state) {
  console.log('State', state);
  // const isAuthenticated = state.session.authenticated;
  return {
    // isAuthenticated,
  };
}

Home.propTypes = {
  // role: PropTypes.string.isRequired,
  // agency: PropTypes.string.isRequired,
  // notificationCount: PropTypes.number,
  // ssnLastSearched: PropTypes.string,
  // queryStringLastSearched: PropTypes.string,
};

// Basically: pass redux's global state into this component as props
// Using withRouter due to this issue:
// https://stackoverflow.com/questions/43895805/react-router-4-does-not-update-view-on-link-but-does-on-refresh
export default withRouter(drizzleConnect(Home, mapStateToProps));
