// For manual testing:
// ProofContract.deployed().then((instance) => app = instance)
// app.submitProof("IPFS Hash", "Proof Title", "Proof Decription", 0);
// `var productEvent = app.addedProductEvent({}, {fromBlock: 0,toBlock: 'latest'}).watch(function(error, event) {console.log(event);})`


var ProofContract = artifacts.require("./ProofContract.sol");

contract('ProofContract', function(accounts) {

    it("Can be deployed.", async () => {
        let proofContractInstance = await ProofContract.deployed();
        return assert.notEqual(proofContractInstance, undefined, "Proof contract has been deployed.");
    });

    it("Can upload new piece of proof and update total proof count", async () => {
        let proofContractInstance = await ProofContract.deployed();
        await proofContractInstance.submitProof("IPFS Hash", "Proof Title", "Proof Decription", 0);
        let totalProofs = await proofContractInstance.getTotalProofs.call();       
        return assert.equal(totalProofs, 1, "Public proofs mapping contains 1 proof.");
    });

    it("Can upload new piece of proof with correct owner", async () => {
        let proofContractInstance = await ProofContract.deployed();
        let proofOwner = await proofContractInstance.getOwner(0);
        return assert.equal(proofOwner, accounts[0], "Owner of first proof is first account.");
    });
    
    it("Can not be destroyed by accounts other than the owner.", async () => {
        let proofContractInstance = await ProofContract.deployed();
        try {
            await proofContractInstance.destroy({from: accounts[1]}); // If this does not throw an error, there is a problem
            return assert.isTrue(false, "Proof contract has been destroyed by non-owner.");
        } catch(error) {
            return assert.isTrue(true, "Proof contract has not been destroyed.");
        }
    });

    it("Can be destroyed by the owner.", async () => {
        let proofContractInstance = await ProofContract.deployed();
        await proofContractInstance.destroy();
        // let proofContractInstanceAfterDestruction = await ProofContract.deployed();
        // use proofContractInstance and get contract address. Then see if there is a contract at that address. Google that
        return assert.equal(proofContractInstanceAfterDestruction, undefined, "Proof contract has been destroyed.");
    });

    // it("Investigator cannot exceute ApplicationRegistry:recordApplication.", async () => {
    //     return let proofContractInstanceawait  = ProofContract.deployed();
    //     return proofContractInstance.verify(2, "ApplicationRegistry:recordApplication");
    //     })
    //     .then(function(verifyResult) {
    //     assert.equal(verifyResult, false, "Verify returns false.");
    //     });
    // });
});
