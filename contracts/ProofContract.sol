pragma solidity ^0.4.23;

import "./Ownable.sol";

contract ProofContract is Ownable {
  // Constructor
  // function Amsterdam(uint[] _primes) public {
  //   primes = _primes;
  // }

  // Enums & Structs
  enum ProofType { picture, video }
  struct Proof {
    uint id;
    address owner;
    string ipfs;
    string title;
    string description;
    ProofType proofType;
  }

  // State Variables
  mapping (uint => Proof) public Proofs;
  uint proofCounter;

  // Event declaration
  event EvtProofAdded(
    address indexed _owner,
    uint _id,
    string _ipfs,
    string _title
  );

  // Function declarataio

  // Add a peice of proof to the blockchain
  function submitProof(string _ipfs, string _title, string _description, ProofType _proofType) public {
  proofCounter++;

  // Adding proof to Proofs mapping
  Proofs[proofCounter] = Proof(
     proofCounter,
     msg.sender,
     _ipfs,
     _title,
     _description,
     _proofType
     );

    emit EvtProofAdded(msg.sender, proofCounter, _ipfs, _title);
  }

  // Getter functions
  function getIPFS(uint _id) constant public returns (string x) {
      return Proofs[_id].ipfs;
  }

  function getTotalProofs() public view returns (uint x){
      return proofCounter;
  }

  function getDescription(uint _id) constant public returns (string x) {
    return Proofs[_id].description;
  }

  function getTitle(uint _id) constant public returns (string x) {
      return Proofs[_id].title;
  }
}