// Import React Modules
import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
// Import Matieral UI
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// Import Scenes
import ProofListContainer from './ProofListContainer/ProofListContainer';
import SubmitProofDialogContainer from './SubmitProofDialogContainer/SubmitProofDialogContainer';

// Import Components
import TabBar from '../../components/TabBar/TabBar';
import Header from '../../components/Header/Header';
import AddProofButton from '../../components/AddProofButton/AddProofButton';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleAddProofClick = this.handleAddProofClick.bind(this);
  }

  handleAddProofClick() {
    console.log('Clicked');
  }

  render() {
    return (
      <div className="row h-100">
        <div className="main-content col-lg-10 col-md-9 col-sm-12 offset-lg-2 offset-md-3 p-0">
        <Header/>
        <TabBar/>
        <h1>Prove It</h1>
        <ProofListContainer/>
        <AddProofButton/>
        <SubmitProofDialogContainer/>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
};

// Makes global state available in this component through props
const mapStateToProps = state => {
  console.log('State: ', state);
  return {
  };
};

// Basically: pass redux's global state into this component as props
// Using withRouter due to this issue:
// https://stackoverflow.com/questions/43895805/react-router-4-does-not-update-view-on-link-but-does-on-refresh
export default withRouter(drizzleConnect(Home, mapStateToProps));
