// Import React Modules
import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

// Import Scenes
import TabBar from '../../components/TabBar/TabBar';
import Header from '../../components/Header/Header';

// Import Components

class Home extends Component {
  render() {
    return (
      <div className="row h-100">
        <div className="main-content col-lg-10 col-md-9 col-sm-12 offset-lg-2 offset-md-3 p-0">
        <Header/>
        <TabBar/>
        <h1>Prove It</h1>
        </div>
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
