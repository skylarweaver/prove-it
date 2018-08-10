// Import React Modules
import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Idle from 'react-idle';


// Import Scenes
import Sidebar from '../Sidebar/Sidebar';
import SearchContainer from '../SearchContainer/SearchContainer';
import NotificationContainer from '../NotificationContainer/NotificationContainer';
import Logout from '../Logout/Logout';

// Import Components
import PrivateRoute from '../../components/PrivateRoute';

// <Idle
// timeout={5000}
// onChange={({ idle }) => {
//   if (this.props.isAuthenticated && idle) {
//     this.props.history.push('/logout');
//   }
// }}
// />

class Home extends Component {
  render() {
    return (
      <div className="row h-100">
        <aside className="main-sidebar bg-primary col-12 col-md-3 col-lg-2 px-0">
          <Sidebar role={this.props.role}
                   agency={this.props.agency}
                   notificationCount={this.props.notificationCount}
                   ssnLastSearched={this.props.ssnLastSearched}
                   queryStringLastSearched={this.props.queryStringLastSearched}></Sidebar>
        </aside>
        <div className="main-content col-lg-10 col-md-9 col-sm-12 offset-lg-2 offset-md-3 p-0">
          <Switch>
            {
              // If subject logs in, they should only be able to access their clearance details
            }
            <PrivateRoute exact path="/" isAuthenticated={this.props.role !== 'Subject'} component={SearchContainer}/>
            <PrivateRoute path="/notifications" isAuthenticated={this.props.role !== 'Subject'} component={NotificationContainer}/>
            <PrivateRoute path="/settings" isAuthenticated={this.props.role !== 'Subject'} component={SearchContainer}/>
            <PrivateRoute path="/my-profile" isAuthenticated={this.props.role !== 'Subject'} component={SearchContainer}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/search" component={SearchContainer}/>
          </Switch>
        </div>
      </div>
    );
  }
}

// Makes global state available in this component through props
function mapStateToProps(state) {
  const {
    role,
    agency,
    jwt,
  } = state.session.user;
  const isAuthenticated = state.session.authenticated;
  return {
    isAuthenticated,
    role,
    agency,
    jwt,
    notificationCount: state.setNotificationCountReducer.notificationCount,
    ssnLastSearched: state.setLastSearchReducer.ssnLastSearched,
    queryStringLastSearched: state.setLastSearchReducer.queryStringLastSearched,
  };
}

Home.propTypes = {
  role: PropTypes.string.isRequired,
  agency: PropTypes.string.isRequired,
  notificationCount: PropTypes.number,
  ssnLastSearched: PropTypes.string,
  queryStringLastSearched: PropTypes.string,
};

// Basically: pass redux's global state into this component as props
// Using withRouter due to this issue:
// https://stackoverflow.com/questions/43895805/react-router-4-does-not-update-view-on-link-but-does-on-refresh
export default withRouter(connect(mapStateToProps)(Home));
