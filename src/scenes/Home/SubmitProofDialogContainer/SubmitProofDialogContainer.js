// Import React Modules
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
// Import Components
import FileUploader from '../../../components/FileUploader/FileUploader';
import Loader from '../../../components/Loader/Loader';
// Init IPFS
const IpfsApi = window.IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


class SubmitProofDialogContainer extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      title: '',
      descriptions: '',
      fileIpfsHash: '',
      loadingSubmit: false,
    };
    this.contracts = context.drizzle.contracts;

    this.handleChange = this.handleChange.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.prepareFileForIpfs = this.prepareFileForIpfs.bind(this);
  }

  handleClose() {
    this.props.actions.setSubmitProofDialogOpen(false);
  }

  async handleSubmit() {
    // Declare this transaction to be observed. We'll receive the stackId for reference.
    const stackId = await this.contracts.ProofContract.methods.submitProof.cacheSend(
      this.state.fileIpfsHash,
      this.state.title,
      this.state.description,
      0,
      { from: this.props.accounts[0] },
    );
    this.contracts.ProofContract.methods.proofCounter.cacheCall();

    // Use the dataKey to display the transaction status.
    if (this.props.transactionStack[stackId]) {
      const txHash = this.props.transactionStack[stackId];
      console.log('Transaction Hash: ', txHash);
    }
    this.setState({ loadingSubmit: false });
    this.props.history.push('/your-proof');
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  captureFile(event) {
    event.stopPropagation();
    event.preventDefault();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new window.FileReader();
      reader.onload = (event) => {
        this.setState({
          fileContent: event.target.result,
          fileName: file.name,
        });
      };
      // reader.readAsText(new Blob([file], { // Use this is expecting text
      reader.readAsArrayBuffer(new Blob([file], { // use array buffer if expecting an image
        type: 'application/json',
      }));
    }
  }

  async saveToIpfs(reader) {
    const buffer = Buffer.from(reader.result);
    return new Promise(resolve => {
      IpfsApi.add(buffer, (err, ipfsHash) => {
        if (err) {
          resolve('resolved');
        }
        // setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ fileIpfsHash: ipfsHash[0].hash });
        resolve('resolved');
      });
    });
  }

  async prepareFileForIpfs() {
    this.handleClose();
    this.setState({ loadingSubmit: true });
    const blob = new File([this.state.fileContent], this.state.filename, { type: 'image/png' });
    const reader = new window.FileReader();
    reader.onloadend = async () => {
      await this.saveToIpfs(reader);
      this.handleSubmit();
    };
    await reader.readAsArrayBuffer(blob);
  }

  render() {
    return (
      <div >
        {
          this.state.loadingSubmit ?
            <div className="loadingIndicator">
              <Loader/>
            </div>
            :
            <Dialog
              open={this.props.isSubmitProofDialogOpen}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Submit Your Proof of Existence</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Now is your chance to prove that something exists. Use this application to pseudo-permanently store a photo
                  on the <Link to='https://ipfs.io/' target='_blank'>Inter-Planetary File System</Link> and save the details
                  of the photo (including the IPFS link) immutably to the Ethereum blockchain.
                  <br></br><br></br>
                  <ol>
                    <li>Upload a photo</li>
                    <li>Give it a title</li>
                    <li>Add a description</li>
                    <li>Press Upload to store it on IPFS and save its data on the blockchain</li>
                  </ol>
                  Once the transaction is confirmed by Metamask, you will need to refresh the page manually, due to a currently open Metamask issue with web3 1.0. Also ensure you are not behind any firewalls or proxies in order for the IPFS upload to work.
                  <br></br><br></br>
                </DialogContentText>
                <FileUploader captureFile={this.captureFile}/>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  name="title"
                  label="Proof Title"
                  type="title"
                  fullWidth
                  onChange={this.handleChange}
                />
                <TextField
                  margin="dense"
                  id="description"
                  name="description"
                  label="Proof Description"
                  type="description"
                  fullWidth
                  multiline
                  rowsMax="4"
                  onChange={this.handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.prepareFileForIpfs} color="primary">
                  Submit Proof
                </Button>
              </DialogActions>
            </Dialog>
        }
      </div>
    );
  }
}

SubmitProofDialogContainer.propTypes = {
  isSubmitProofDialogOpen: PropTypes.any,
  ProofContract: PropTypes.obj,
  transactions: PropTypes.obj,
  transactionStack: PropTypes.array,
  accounts: PropTypes.array,
};

SubmitProofDialogContainer.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    isSubmitProofDialogOpen: state.submitProofReducer.isSubmitProofDialogOpen,
    ProofContract: state.contracts.ProofContract,
    accounts: state.accounts,
    transactions: state.transactions,
    transactionStack: state.transactionStack,
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
