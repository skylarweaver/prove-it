// Import React Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Styles

// Import Scenes/Components
import Tab from './Tab/Tab';

class Tabs extends Component {
  constructor(props) {
    super(props);

    // Set inital state to select first tab
    this.state = {
      // selectedTabId: 1,
    };
  }

  componentDidMount() {
    // The following logic ensure the correct tab is selected on refresh
    const currentHref = `/${window.location.toString().split('/')[3]}`;
    const totalTabs = this.props.tabs.length;
    let currentTabIndex = 1;
    this.props.tabs.forEach((tab) => {
      if (tab.linkTo === currentHref) {
        this.setActiveTab(currentTabIndex);
        return;
      } else if (currentTabIndex === totalTabs) {
        this.setActiveTab(1);
      }
      currentTabIndex += 1;
    });
  }

  // Takes tab id as param and determines if that tab is active
  isActive(id) {
    return this.state.selectedTabId === id;
  }

  // Once tab is clicked, this is called to set active tab to that tab
  setActiveTab(selectedTabId) {
    this.setState({ selectedTabId });
  }

  render() {
    const total = this.props.tabs;
    const tabs = total.map((el, i) => {
      return <Tab
        key={ i }
        content={ el.name }
        isActive={ this.isActive(el.id) }
        onActiveTab={ this.setActiveTab.bind(this, el.id) }
        linkTo={ el.linkTo }
      />;
    });

    return <ul className="nav nav-tabs">
            { tabs }
          </ul>;
  }
}

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
};

export default Tabs;
