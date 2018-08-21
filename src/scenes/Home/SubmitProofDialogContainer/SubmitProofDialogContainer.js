// Import React Modules
import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
// Import Matieral UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Import Redux
import { bindActionCreators } from 'redux';
import { setSubmitProofDialogOpen } from '../../../redux/actions';

// Import Scenes

// Import Components
import FileUploader from '../../../components/FileUploader/FileUploader';

class SubmitProofDialogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    console.log('Clicked');
    this.props.actions.setSubmitProofDialogOpen(false);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...
  }

  render() {
    return (
      <div >
        <Dialog
          open={this.props.isSubmitProofDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Submit Proof</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Submit your proof of existence
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Proof Title"
              type="title"
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              label="Proof Description"
              type="description"
              fullWidth
              multiline
              rowsMax="4"
            />
            <FileUploader/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SubmitProofDialogContainer.propTypes = {
  isSubmitProofDialogOpen: PropTypes.boolean,
};

const mapStateToProps = state => {
  console.log('State:', state);
  return {
    isSubmitProofDialogOpen: state.submitProofReducer.isSubmitProofDialogOpen,
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
export default withRouter(drizzleConnect(SubmitProofDialogContainer, mapStateToProps, mapDispatchToProps));
