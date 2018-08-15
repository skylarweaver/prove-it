pragma solidity ^0.4.23;

// Destructible also import Ownable contract from Zeppelin so can use Ownable functions as well
import "openzeppelin-solidity/contracts/lifecycle/Destructible.sol";

contract ProofContract is Destructible {
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
  mapping (uint => Proof) public proofs;
  uint public proofCounter = 0;

  // Event declaration
  event EvtProofAdded(
    address indexed _owner,
    uint _id,
    string _ipfs,
    string _title
  );

  // Function declaration

  // Add a piece of proof to the blockchain
  function submitProof(string _ipfs, string _title, string _description, uint _proofType) public {
    ProofType enumProofType = ProofType(_proofType);
    // Adding proof to proofs mapping
    proofs[proofCounter] = Proof(
      proofCounter,
      msg.sender,
      _ipfs,
      _title,
      _description,
      enumProofType
    );
    emit EvtProofAdded(msg.sender, proofCounter, _ipfs, _title);

    proofCounter++; 
  }

  // Getter functions
  function getIPFS(uint _id) public view returns (string x) {
    return proofs[_id].ipfs;
  }

  function getTotalProofs() public view returns (uint x){
    return proofCounter;
  }

  function getOwner(uint _id) public view returns (address x) {
    return proofs[_id].owner;
  }

  function getDescription(uint _id) public view returns (string x) {
    return proofs[_id].description;
  }

  function getTitle(uint _id) public view returns (string x) {
    return proofs[_id].title;
  }
}