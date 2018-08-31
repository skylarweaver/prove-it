Prove It! — Ethereum dApp
===============

## What is Prove It
------
Prove It is an Ethereum-based Proof of Existence distributed application.

Using Prove It, you can take a photo of something (virtual proof that it exists) and upload it via the dApp React-based UI. The upload is then stored on IPFS (Inter-Planetary File System — a decentralized file storage network) and its IPFS reference hash and detail information is stored immutably on the blockchain. Using the webapp, users can view all of their personal proof uploads in one tab and everyone else's proof uploads in another tab. The user also has the ability to view a specific piece of proof uploaded, as each proof uploaded has its own reference url within the dApp. 

**Note:** To truly prove the existence of something, it would be prudent to include the current block number and timestamp somewhere inside of your Proof of Existence photo (as simple as being written down on a peice of paper in your photo). You may ask, "but why isn't that included or superimposed over the photo on upload?" While technically, that is feasible, it would be less secure as it would be more forgeable than using your own note with your own unique characteristics such as size, handwriting, location in photo, etc.

## How to set it up
------
### Requirements
* Node.js
* Truffle (or equivalent test blockchain)
* Metamask (or equivalent browser protocol provider)

### Web Installation
* Run the following commands from the root directory
* `npm install`
* Optional: Run `npm run lint` which will lint the Solidty files using Solium

### Contract Deployment

* `truffle develop`
* Inside truffle develop console, `migrate --compile-all --reset`
* Inside truffle develop console, `test` - this will run the truffle tests I created for the contracts
* Inside truffle develop console, `deploy`

### Run the Web App
Perform the following commands in a new terminal tab
* `ln -sf ~/full-path-to-truffle-build-folder/build src/` - Create a sym link inside of the src folder so webapp can access truffle contract ABIs. My command was: `ln -sf ~/dev/blockchain/consensys-final-project/build src/`. Alternatively copy Truffle build folder into /src folder.
* `npm run start` - To run the application for local development, includes live reload
* You should be prompted with a warning saying: "We can't find any Ethereum accounts! Please check and make sure Metamask or you browser are pointed at the correct network and your account is unlocked."

### Import Test Accounts into Metamask
* Install Metamask for chome: https://metamask.io/
* Once installed, connect to your local test network at http://127.0.0.1:9545/ (if using Truffle develop)
* Add a new network if that one is not shown by default.
* Then go to settings by clicking your colorful logo in the top right
* Select `Import Account`
* Import the first Truffle develop test account by using this private key: c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
* Import the second Truffle develop test account by using this private key: ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
* Go back to the dApp and refresh the page

## More About Prove It
------
### Testing
My smart contracts include 5 tests for the following:
* Ensure the contracts can be deployed to the network
* Ensure it's possible to upload a new piece of proof and the proofCounter increments correctly
* Ensure a piece of proof is uploaded and contains the correct owner 
* Ensure the contract cannot be destroyed by accounts other than that which is owned by the contract owner
* Ensure the contract can be destroyed safely by the contract owner

### Libraries
In order to ensure maintainability and that this dApp is only using smart contract code that has been battle tested and is secure, I decided to use as many OpenZeppelin libraries as possible. In this project, I only needed one import — Destrucible.sol. This library ensures that I am able to securely destroy this contract when necessary, but that it is not possible for anyone (non-owners) to destroy this project. You can view in my ProofContract.sol file that I am importing that library from OpenZeppelin.

### Design Patterns
In this project, I chose the most straightforward Monolithic design pattern which included simple contract-client interaction. The dApp consists of one smart contract, which imports one well-tested, trusted library. This contract is then deployed to the blockchain, where my front-end client can then interact with it through use of a third party provider (i.e. Metamask). There is no back-end server to this project, as I wanted to keep the application as decentralized as possible, and with only a smart contract, some tests, and client, that can be achieved. Some other conscious design decisions I made during development were: 

1. **Fail early and fail loud** by using `revert` instead of silent if statements
2. **Restricting Access** to only those that should have access to certain functions within my smart contract
3. Making the contract **Mortal** by use of the destructible and ownable library imports

### Avoiding Common Attacks
Because there is inherently no transfer of funds (other than simple gas fees) involved in this application, there were fewer security attacks to be avoided. One security attack in which I did prepare for was a Contract Destruction attack, wherein an attacker attempts to destroy one's contract which they do not own. By ensuring that my contract is 1) Ownable and 2) Destructible, I've ensure that only I (the owner) can own and destroy my contract; therefore, evading one of the largest common attacks on my non-value-transferring dApp. Other attacks that have been taken into consideration in my smart contract development were:

1. I avoided all use of **Timestamp Dependence** in order to ensure that function actions executed as I expected them to.
2. While I do have a proofCounter, the counter only increments by 1, so to prevent **Integer Overflow** attacks

## Credits

Created by **Skylar Weaver** — Software Developer @ Deloitte Digital