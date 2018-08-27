// Import React Modules
import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

// Import Scenes
import ProofListContainer from './ProofListContainer/ProofListContainer';
import SubmitProofDialogContainer from './SubmitProofDialogContainer/SubmitProofDialogContainer';

// Import Components
import Header from '../../components/Header/Header';
import AddProofButton from '../../components/AddProofButton/AddProofButton';
import ProofItem from '../../components/ProofItem/ProofItem';

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
        <Header/>
        <div className="main-content col-md-6 col-sm-10 offset-md-3 p-5">
          <Switch>
            <Route exact path="/" component={ProofListContainer}/>
            <Route exact path="/your-proof" component={ProofListContainer}/>
            <Route exact path="/all-proof" component={ProofListContainer}/>
            <Route exact path="/proof/:proofId" component={ProofItem}/>
          </Switch>
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
  // console.log('State: ', state);
  return {
  };
};

// Basically: pass redux's global state into this component as props
// Using withRouter due to this issue:
// https://stackoverflow.com/questions/43895805/react-router-4-does-not-update-view-on-link-but-does-on-refresh
export default withRouter(drizzleConnect(Home, mapStateToProps));
