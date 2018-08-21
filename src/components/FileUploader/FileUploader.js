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
import { setSubmitProofDialogOpen } from '../../redux/actions';
// Init IPFS
// const ipfsApi = window.IpfsApi('localhost', '8080', { protocol: 'https' });
const IpfsApi = window.IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


// Import Scenes

// Import Components

class SubmitProofDialogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipfsHashUrl: '',
      file: '',
      name: '',
    };
    this.captureFile = this.captureFile.bind(this);
    this.saveToIpfs = this.saveToIpfs.bind(this);
  }

  captureFile(event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    const reader = new window.FileReader();
    reader.onload = (event) => {
      this.setState({
        // encText: this.encryptWithPublicKey(event.target.result),
        file: event.target.result,
        name: file.name,
      });
      console.log(event.target.result);
      console.log(file.name);
      // button.disabled = false;
      this.prepareFileForIpfs();
    };
    reader.readAsText(new Blob([file], {
      type: 'application/json',
    }));
  }

  saveToIpfs = async (reader) => {
    // let ipfsId;
    // const buffer = Buffer.from(reader.result);
    // console.log(buffer);
    // // ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
    // ipfsApi.add(buffer)
    //   .then((response) => {
    //     console.log(response);
    //     ipfsId = response[0].hash;
    //     console.log(`https://ipfs.io/ipfs/${ipfsId}`);
    //     this.setState({ ipfsHashUrl: ipfsId });
    //     return true;
    //   }).then((result) => {
    //     this.newEntry();
    //   }).catch((err) => {
    //     console.error(err);
    //   });

    let ipfsId;
    const buffer = Buffer.from(reader.result);
    console.log(buffer);
    await IpfsApi.add(buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      // setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      console.log(ipfsHash[0].hash);
    });
  }

  prepareFileForIpfs() {
    console.log('HELLO');
    const blob = new File([this.state.file], this.state.filename, { type: 'text/plain' });
    const reader = new window.FileReader();
    reader.onloadend = () => this.saveToIpfs(reader);
    reader.readAsArrayBuffer(blob);
  }

  render() {
    return (
      <div >
        <label>Upload Proof</label>
        <br></br>
        <input type="file" id="myFile" onChange={this.captureFile}/>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
    }, dispatch),
  };
};

// Basically: pass redux's global state into this component as props
// Using withRouter due to this issue:
// https://stackoverflow.com/questions/43895805/react-router-4-does-not-update-view-on-link-but-does-on-refresh
export default withRouter(drizzleConnect(SubmitProofDialogContainer, mapStateToProps, mapDispatchToProps));
