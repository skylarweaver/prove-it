// Import React Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
// Import Redux
import { bindActionCreators } from 'redux';
// Import Components
import TabBar from '../../../components/TabBar/TabBar';
import ProofItem from '../../../components/ProofItem/ProofItem';

class ProofListContainer extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      proofCounter: 0,
      dataKeys: [],
      proofs: [],
    };
  }

  componentDidMount() {
    console.log('Contract:', this.contracts.ProofContract.events.EvtProofAdded);
    this.contracts.ProofContract.events.EvtProofAdded({/* eventOptions */}, (error, event) => {
      console.log(error, event);
    });

    // this.contracts.ProofContract.events.EvtProofAdded({}, { fromBlock: 0, toBlock: 'latest' }).watch((error, event) => {
    //   // This is called after metamask initiates transaction
    //   // We take the transaction ID that metamask initiated compare it to that of the new log event to ensure it matches our transaction
    //   // if (event['transactionHash'] === this.state.transactionHash){
    //   console.log(event);
    //   // this.setState({
    //   // waitingConfirmation: false
    //   // });
    //   // }
    // });
  }

  componentDidUpdate(prevProps) {
    // console.log('this.state.proofs', this.state.proofs);
    // console.log('this.state.proofs.length', this.state.proofs.length);
    // console.log('this.state.proofCounter', this.state.proofCounter);
    // console.log('--------------------------------------------');
    // console.log('ProofContract.proofs', this.props.ProofContract.proofs);
    // if (!Object.is(prevProps.ProofContract.proofs, this.props.ProofContract.proofs)) {
    // console.log('Object.is(prevProps.ProofContract.proofs, this.props.ProofContract.proofs)', Object.is(prevProps.ProofContract.proofs, this.props.ProofContract.proofs));
    // }
    // First initialization w/ proofContract in props
    if (prevProps.ProofContract.initialized === false && this.props.ProofContract.initialized === true) {
      // Get number of proofs so that you can loop through and get each product details
      this.getProofCounter().then(() => {
        // Loop through proofs, requesting data for each proof. Get dataKey which directs to each proof data and save datakeys
        this.getDataKeysBasedOnProofCounter();

        // Using array of datakeys, loop through proofs and get data for each proof using each respective dataKey
        this.getProofsFromDataKeys();
      });
    }

    // Subesquent initializations w/ proofContract in props that meet the below criteria
    // Ensure we don't get caught in infinite loop, so only run get proof functions if proof array is less than the proof counter (based on the selected tab)
    if (this.props.ProofContract.initialized === true &&
        prevProps.ProofContract.initialized === true &&
        (this.state.proofs.length < (this.state.proofsLengthBasedOnTab ? this.state.proofsLengthBasedOnTab : this.state.proofCounter))
    ) {
      console.log('HI');
      // Get number of proofs so that you can loop through and get each product details
      this.getProofCounter().then(() => {
        // Loop through proofs, requesting data for each proof. Get dataKey which directs to each proof data and save datakeys
        this.getDataKeysBasedOnProofCounter();

        // Using array of datakeys, loop through proofs and get data for each proof using each respective dataKey
        this.getProofsFromDataKeys();
      });
    }

    if (this.props.ProofContract.initialized === true && prevProps.ProofContract.initialized === true && prevProps.selectedTab !== this.props.selectedTab) {
      // Get number of proofs so that you can loop through and get each product details
      this.getProofCounter().then(() => {
        // Loop through proofs, requesting data for each proof. Get dataKey which directs to each proof data and save datakeys
        this.getDataKeysBasedOnProofCounter();

        // Using array of datakeys, loop through proofs and get data for each proof using each respective dataKey
        this.getProofsFromDataKeys();
      });
    }

    //  if (this.props.ProofContract.initialized === true) {
    //   this.contracts.ProofContract.methods.proofs(0).call().then((proofData) => {
    //   });
    // }
  }

  // Get number of proofs so that you can loop through and get each product details
  getProofCounter() {
    return new Promise(resolve => {
      this.contracts.ProofContract.methods.proofCounter().call().then((proofCounterResponse) => {
        this.setState({
          proofCounter: proofCounterResponse,
        });
        resolve('proofCounter Resolved');
      });
    });
  }

  // Loop through proofs, requesting data for each proof. Get dataKey which directs to each proof data and save datakeys
  getDataKeysBasedOnProofCounter() {
    const dataKeys = [];
    for (let i = 0; i < this.state.proofCounter; i += 1) {
      const dataKey = this.contracts.ProofContract.methods.proofs.cacheCall(i);
      dataKeys.push(dataKey);
    }
    this.setState({
      dataKeys,
    });
  }

  // Using array of datakeys, loop through proofs and get data for each proof using each respective dataKey
  getProofsFromDataKeys() {
    // This does not work. Only for mapping or comparying keys/indexes. Need another way to determine if proof has been added.
    // Could do array but this is slow.
    // MAYBE create a new array each time this function is called and replace state array INSTEAD of appending to it. That could work.
    // The best solution would be to have a consistent array, and then only check for updates on that array.
    // Get all proofs at init and create/set array
    // Then on event, update append to that array with new proof.
    // Using array of datakeys, loop through proofs and get data for each proof using each respective dataKey
    const proofsCopy = [];
    this.state.dataKeys.forEach((dataKey) => {
      if (dataKey in this.props.ProofContract.proofs) {
        const proofData = this.props.ProofContract.proofs[dataKey].value;
        if (this.filterProofBySelectedTab(proofData)) {
          proofsCopy.push(proofData);
        }
      }
    });
    this.setState({
      proofs: proofsCopy,
      proofsLengthBasedOnTab: proofsCopy.length,
    });
  }

  filterProofBySelectedTab(proof) {
    const currAccount = this.props.accounts[0];
    // If tab is on "Your Proofs" and proof is not owned by "you" return false
    if (this.props.selectedTab === 1 && proof.owner !== currAccount) {
      return false;
    }
    return true;
  }

  render() {
    const proofListItems = this.state.proofs.map((proof) => {
      return <ProofItem key={proof.id} proof={proof}/>;
    });
    return (
      <div>
        <h1 className="page-title">Prove It!</h1>
        <h2 className="page-subtitle">Your personal proof of existence dApp</h2>
        <TabBar/>
        {
          this.state.proofs.length === 0 ?
            <p>There are curently no proofs with that criteria in the system. Please submit a new piece of proof using the button below!</p>
            :
            <div>
              {proofListItems}
            </div>
        }
      </div>
    );
  }
}

ProofListContainer.contextTypes = {
  drizzle: PropTypes.object,
};

ProofListContainer.propTypes = {
  ProofContract: PropTypes.obj,
  selectedTab: PropTypes.integer,
  accounts: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    ProofContract: state.contracts.ProofContract,
    selectedTab: state.setTabReducer.selectedTab,
    accounts: state.accounts,
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
export default withRouter(drizzleConnect(ProofListContainer, mapStateToProps, mapDispatchToProps));
