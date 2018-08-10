pragma solidity ^0.4.23;

contract Ownable {
  // state variables
  address owner;

  // modifiers
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // constructor
  function ownable() public {
    owner = msg.sender;
  }
}