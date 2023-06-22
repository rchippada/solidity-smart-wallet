const SmartWallet = artifacts.require("SmartWallet");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(SmartWallet, {from: accounts[0]});
}