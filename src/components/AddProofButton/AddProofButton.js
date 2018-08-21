// Import React Modules
import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
// Import Matieral UI
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// Import Redux
import { bindActionCreators } from 'redux';
import { setSubmitProofDialogOpen } from '../../redux/actions';

// Import Scenes

// Import Components

class AddProofButton extends Component {
  constructor(props) {
    super(props);
    this.handleAddProofClick = this.handleAddProofClick.bind(this);
  }

  handleAddProofClick() {
    console.log('Clicked', this.props.actions);
    this.props.actions.setSubmitProofDialogOpen(true);
  }

  render() {
    return (
      <div >
        <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleAddProofClick}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

AddProofButton.propTypes = {
  isSubmitProofDialogOpen: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    isSubmitProofDialogOpen: state.isSubmitProofDialogOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setSubmitProofDialogOpen,
    }, dispatch),
  };
};

// Basically: pass redux's global state into this component as props
// Using withRouter due to this issue:
// https://stackoverflow.com/questions/43895805/react-router-4-does-not-update-view-on-link-but-does-on-refresh
export default withRouter(drizzleConnect(AddProofButton, mapStateToProps, mapDispatchToProps));
