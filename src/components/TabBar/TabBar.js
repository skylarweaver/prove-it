// Import React Modules
import React, { Component } from 'react';

// Import assets

// Import Scenes
import Tabs from './Tabs/Tabs';

// Import Services

class TabBar extends Component {
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
      { id: 1, name: 'Your Proof', linkTo: '/your-proof' },
      { id: 2, name: 'All Proof', linkTo: '/all-proof' },
    ];

    return (
      <div>
        <Tabs tabs={tabs} />
      </div>
    );
  }
}

TabBar.propTypes = {
};

export default TabBar;
