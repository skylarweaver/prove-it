// Import React Modules
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import Components
import PrivateRoute from '../components/PrivateRoute';

// Import Scenes
import Home from './Home/Home';
import Login from './Login/Login';

class AuthComponent extends Component {
  //   // jchan
  //   // S1curityKlr@nce

  render() {
    return (
      <div className="container-fluid">
        {
          <Switch>
              <Route exact path='/login' component={Login}/>
              <PrivateRoute path='/' isAuthenticated={this.props.isAuthenticated} component={Home}/>
          </Switch>
        }
      </div>
    );
  }
}

AuthComponent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

// Makes global state available in this component through props
function mapStateToProps(state) {
  return {
    isAuthenticated: state.session.authenticated,
  };
}

// Basically: pass redux's global state into this component as props
// Using withRouter due to this issue:
// https://stackoverflow.com/questions/43895805/react-router-4-does-not-update-view-on-link-but-does-on-refresh
export default withRouter(connect(mapStateToProps)(AuthComponent));
