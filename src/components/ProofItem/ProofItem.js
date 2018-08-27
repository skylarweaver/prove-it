// Import React Modules
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
// Import Assets
import linkIcon from '../../assets/link.png';

class ProofItem extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      proofIdFromParams: this.props.match.params.proofId,
      proofIpfs: this.props.proof ? this.props.proof.ipfs : '',
      proofTitle: this.props.proof ? this.props.proof.title : '',
      proofDescription: this.props.proof ? this.props.proof.description : '',
      proofId: this.props.proof ? this.props.proof.id : '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ProofContract.initialized === false && this.props.ProofContract.initialized === true) {
      this.getProofIpfsFromProofId();
      this.getProofCounter();
    }
  }

  getProofIpfsFromProofId() {
    this.contracts.ProofContract.methods.proofs(this.state.proofIdFromParams).call().then((proofData) => {
      this.setState({
        proofIpfs: proofData.ipfs,
        proofTitle: proofData.title,
        proofDescription: proofData.description,
        proofId: proofData.id,
      });
    });
  }

  getProofCounter() {
    this.contracts.ProofContract.methods.proofCounter().call().then((proofCounterResponse) => {
      this.setState({
        proofCounter: proofCounterResponse,
      });
    });
  }

  render() {
    const renderLinkIcon = () => {
      return <Link to={`/proof/${this.state.proofId}`} target="_blank">
        <img className="mr-3" src={linkIcon} width="30"/>
      </Link>;
    };
    return (
      <div>
        {
          this.state.proofId >= this.state.proofCounter ?
            <p>Sorry! There are no proofs in our system with this id. Please <Link to="/">return home </Link> </p>
            :
            <div>
              <img className="w-100" src={`https://ipfs.infura.io/ipfs/${this.state.proofIpfs}`}/>
              <div className="row d-flex justify-content-between mt-3">
                <h3 className="ml-3">{this.state.proofTitle}</h3>
                {
                  // Don't render link icon when already on the details page
                  this.props.match.params.proofId === undefined &&
                  renderLinkIcon()
                }
              </div>
              <p>{this.state.proofDescription}</p>
            </div>
        }
      </div>
    );
  }
}

ProofItem.contextTypes = {
  drizzle: PropTypes.object,
};

ProofItem.propTypes = {
  proof: PropTypes.object.isRequired,
  ProofContract: PropTypes.obj,
};

const mapStateToProps = state => {
  return {
    ProofContract: state.contracts.ProofContract,
  };
};

// Basically: pass redux's global state into this component as props
// Using withRouter due to this issue:
// https://stackoverflow.com/questions/43895805/react-router-4-does-not-update-view-on-link-but-does-on-refresh
export default withRouter(drizzleConnect(ProofItem, mapStateToProps));
