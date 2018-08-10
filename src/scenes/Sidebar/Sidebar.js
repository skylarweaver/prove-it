// Import React Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import assets
import logoBG from '../../assets/cc-logo-bg.png';
import logo from '../../assets/cc-logo.png';

// Import Scenes
import Tabs from './Tabs/Tabs';

// Import Services

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userImage: null,
      userName: null,
      userRole: null,
      activeTab: null,
    };
  }

  render() {
    const tabs = [
      { id: 1,
        name: 'Search Clearances',
        linkTo: this.props.ssnLastSearched === undefined ?
          '/'
          :
          {
            pathname: '/search',
            search: `?ssn=${this.props.queryStringLastSearched}`,
            state: {
              ssn: this.props.ssnLastSearched,
              queryString: this.props.queryStringLastSearched,
            },
          },
      },
      { id: 2, name: 'Notifications', linkTo: '/notifications' },
      { id: 3, name: 'Settings', linkTo: '/settings' },
      { id: 4, name: 'Logout', linkTo: '/logout' },
    ];

    const subjectTabs = [
      { id: 1, name: 'Your Clearances', linkTo: '/' },
      { id: 2, name: 'Logout', linkTo: '/logout' },
    ];

    return (
      <div>
        {/* <Link to='/'>
          <div className="main-navbar navbar align-items-stretch navbar-dark flex-md-nowrap p-0 logo-area">
            <img src={logoBG} width="100%" />
            <img src={logo} className="cc-logo" />
          </div>
        </Link> */}
        <Link to='/'>
          <div className="logo-area">
            <div className="logo-div">
              <img src={logo} className="cc-logo" width="100%"/>
            </div>
          </div>
        </Link>
        <div className="sidebar-role w-100 bg-secondary">
          <div className="user-info px-4">
            <h3 className="user-role white pb-3">{this.props.role}</h3>
            <h4 className="user-agency white">{this.props.agency}</h4>
          </div>
        </div>
        <div className="nav-wrapper">
          {
            this.props.role === 'Subject' ?
            <Tabs tabs={subjectTabs} notificationCount={this.props.notificationCount} />
            :
            <Tabs tabs={tabs} notificationCount={this.props.notificationCount} />
          }
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  role: PropTypes.string.isRequired,
  agency: PropTypes.string.isRequired,
  notificationCount: PropTypes.number,
  ssnLastSearched: PropTypes.string,
  queryStringLastSearched: PropTypes.string,
};

export default Sidebar;
