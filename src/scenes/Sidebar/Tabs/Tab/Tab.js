// Import React Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// We should use this function-style component when using a component for display purposes w/o logic invovled
// This is faster than instantiating a class object, and is cleaner
const Tab = (props) => {
  return <li
    className={ props.isActive ? 'navigation--active' : 'navigation' }
    onClick={ props.onActiveTab }
  >
    {
      props.content === 'Notifications' && props.notificationCount > 0 ?
        <span className='navigation--buttonBadge'>{props.notificationCount}</span>
        :
        ''
    }
    <Link to={ props.linkTo }>{ props.content }</Link>
  </li>;
};

Tab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onActiveTab: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  linkTo: PropTypes.any.isRequired,
  notificationCount: PropTypes.number,
};

export default Tab;
