Prove It! — Ethereum dApp
===============

## What is Prove It
------
Prove It is an Ethereum-based Proof of Existence distributed application. Using Prove It, you can take a photo of something (proof that it exists) and upload it via the webapp. The upload is then stored on IPFS (Inter-Planetary File System — a decentralized file storage network) and its IPFS reference hash and detail information is stored immutably on the blockchain. To truly prove the existence of something, it would be prudent to include the current block number and timestamp somewhere inside of your Proof of Existence photo (as simple as being written down on a peice of paper in your photo). You may ask, "but why isn't that included or superimposed over the photo on upload?" While technically, that is feasible, it would be less secure as it would be more forgeable than using your own note with your own unique characteristics such as size, handwriting, location in photo, etc.

## How to set it up
------
### Requirements
* Node.js
* Truffle (or equivalent test blockchain)
* Metamask (or equivalent browser protocol provider)

### Web Installation
* Run the following commands from the root directory
* `npm install`

### Contract Deployment

* `truffle develop`
* Inside truffle develop console, `migrate --compile-all --reset`
* Inside truffle develop console, `test` - this will run the truffle tests I created for the contracts
* Inside truffle develop console, `deploy`

### Run the Web App
* `npm install` - Run in root directory to install all dependencies
* ln -sf /build/ /src/build/ - create a sym link inside of the src folder so web app can access truffle contract ABIs
* `npm run start` - To run the application for local development, includes live reload

### Import Test Accounts into Metamask
* Install Metamask for chome: https://metamask.io/
* Once installed, go to settings by clicking your colorful logo in the top right
* Select `Import Account`
* Import the first Truffle develop test account by using this private key: c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
* Import the second Truffle develop test account by using this private key: ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f

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
In order to ensure maintainability and that this dApp is only using smart contract code that has been battle test and is secure, I decided to use as many OpenZeppelin libraries as possible. In this project, I only needed one import — Destrucible.sol. This library ensure that I am able to securely detroy this contract when necessary, but that it is not possible for anyone (non-owners) to destroy this project. You can view in my ProofContract.sol file that I am importing that library from OpenZeppelin.

### Design Patterns
In this project, I chose the most straightforward design pattern which included contract-client interaction and nothing else. The dApp consists of a smart contract, which imports various libraries. This contract is then deployed to the blockchain, where my front-end client side can then interact with it through use of a third party provider (i.e. Metamask). There is no back-end server to this project, as I wanted to keep the application as decentralized as possible, and with only a smart contract, some tests, and client, that can be achieved.

### Avoiding Common Attacks
Because there is inherently not transfer of funds (other than simple gas fees) involved in this application, there were fewer security attacks to be avoided. One security attack in which I did prepare for was a Contract Destruction attack, wherein an attacker attempts to destroy one's contract which they do not own. By ensuring that my contract is 1) Ownable and 2) Destructible, I've ensure that only I (the owner) can own and destroy my contract; therefore, evading one of the largest common attacks on my non-value-transferring dApp.