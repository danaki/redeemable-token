var RedeemableToken = artifacts.require("RedeemableToken");

module.exports = function(deployer) {
    deployer.deploy(RedeemableToken).then(() => {
        console.log("Deployed RedeemableToken.address: " + RedeemableToken.address)
    });
};
