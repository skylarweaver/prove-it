// Import React Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';

// Import Services
// import web3Service from '../../services/web3Service'
// import checkAccountStatus from '../../services/checkAccountService'

// Import Assets
// import userProfileIcon from '../../assets/userProfileIcon_gray.png'

// Import Styles
import './header.scss';

class Header extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     web3: null,
  //     newProdutContractInstance: null,
  //     account: "",
  //     accountStatus: ""
  //   };
  // };

  // componentWillMount() {
  //    web3Service.getWeb3Service().then(() => {
  //     this.setState({
  //       newProductContractInstance: web3Service.getNewProductContractInstance(),
  //     });

  //     web3Service.getCurrentAccount().then( (accountResult) => {
  //       const accountStatus = checkAccountStatus(accountResult);
  //       this.setState({
  //         account: accountResult,
  //         accountStatus: accountStatus
  //       });
  //     });
  //    });
  // };

  render() {
    return (
    <div className="header">
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark header-navbar">
          <a className="navbar-brand" href="/">Prove It</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            {
              // <ul className="navbar-nav mr-auto">
              //   <li className="nav-item active">
              //   <Link className="nav-link" to='/new-product'>Add a Product<span className="sr-only">(current)</span></Link>
              //   </li>
              //   <li className="nav-item active">
              //     <Link className="nav-link" to='/search'>Search</Link>
              //   </li>
              // </ul>
            }
          <span className="header-navbar-text align-middle">
            <h6 >Account: <span className="header-navbar-text-account">{this.props.accounts[0]}</span></h6>
          </span>
          <span className="header-navbar-text align-middle">
            <h6 >Web3 Status: <span className="header-navbar-text-status">{this.props.web3.status}</span></h6>
          </span>
          </div>
        </nav>
    </div>
    );
  }
}


Header.propTypes = {
  accounts: PropTypes.object.isRequired,
  web3: PropTypes.object.isRequired,
  // role: PropTypes.string.isRequired,
  // agency: PropTypes.string.isRequired,
  // notificationCount: PropTypes.number,
  // ssnLastSearched: PropTypes.string,
  // queryStringLastSearched: PropTypes.string,
};

// LoadingContainer.contextTypes = {
//   drizzle: PropTypes.object
// }
/*
 * Export connected component.
 */
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
  };
};

export default drizzleConnect(Header, mapStateToProps);
