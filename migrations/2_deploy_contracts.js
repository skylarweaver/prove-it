var ProofContract = artifacts.require("./ProofContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ProofContract)
}
