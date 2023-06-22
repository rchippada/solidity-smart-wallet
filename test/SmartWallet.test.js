// SmartWallet test

const SmartWallet = artifacts.require("SmartWallet");
const truffleAssert = require('truffle-assertions');

contract('SmartWallet', (accounts) => {

    it("can withdraw money after depositing", async() => {
        const smartWalletInst = await SmartWallet.deployed();
        const accounts = await web3.eth.getAccounts();
        //console.log(accounts);

        let acctBalanceBeforeDeposit = await web3.eth.getBalance(accounts[1]);

        let txResult = await smartWalletInst.depositMoney({from: accounts[1], value: web3.utils.toWei("10", "ether")});
        truffleAssert.eventEmitted(txResult, 'DepositedMoney');

        let acctBalanceAfterDeposit = await web3.eth.getBalance(accounts[1]);
        assert.equal((acctBalanceBeforeDeposit-acctBalanceAfterDeposit) > web3.utils.toWei("10", "ether"), true, "Account balance is expected to be depleted by 10 ether and gas");

        let allowance = await smartWalletInst.getAllowance(accounts[1]);
        assert.equal(allowance, web3.utils.toWei("10", "ether"), "Allowance expected to be 10 ether");

        txResult = await smartWalletInst.withdrawMoney(accounts[1], {value: web3.utils.toWei("1", "ether")});
        truffleAssert.eventEmitted(txResult, 'WithdrewMoney');

        allowance = await smartWalletInst.getAllowance(accounts[1]);
        assert.equal(allowance, web3.utils.toWei("9", "ether"), "Allowance expected to be 9 ether");

        let acctBalanceAfterWithdraw = await web3.eth.getBalance(accounts[1]);
        assert.equal((acctBalanceAfterWithdraw-acctBalanceAfterDeposit) >= web3.utils.toWei("1", "ether"), true, "Account balance is expected to be increased by withdraw amount");
    })

    it("can give allowance after depositing", async() => {
        const smartWalletInst = await SmartWallet.deployed();
        const accounts = await web3.eth.getAccounts();

        let senderAcctBalanceBeforeDeposit = await web3.eth.getBalance(accounts[3]);
        let ownerAcctBalanceBeforeDeposit = await web3.eth.getBalance(accounts[0]);

        let txResult = await smartWalletInst.depositMoney({from: accounts[3], value: web3.utils.toWei("10", "ether")});
        truffleAssert.eventEmitted(txResult, 'DepositedMoney');

        let senderAcctBalanceAfterDeposit = await web3.eth.getBalance(accounts[3]);
        let ownerAcctBalanceAfterDeposit = await web3.eth.getBalance(accounts[0]);

        assert.equal((senderAcctBalanceBeforeDeposit-senderAcctBalanceAfterDeposit) > web3.utils.toWei("10", "ether"), true, "Account balance is expected to be depleted by 10 ether and gas");
        assert.equal((ownerAcctBalanceAfterDeposit-ownerAcctBalanceBeforeDeposit) > web3.utils.toWei("9", "ether"), true, "Account balance is expected to be increased about 10 ether minus gas");

        let allowance = await smartWalletInst.getAllowance(accounts[3]);
        assert.equal(allowance, web3.utils.toWei("10", "ether"), "Allowance expected to be 10 ether after deposit");

        let recipientAcctBalanceBeforeAllowance = await web3.eth.getBalance(accounts[4]);

        txResult = await smartWalletInst.giveAllowance(accounts[3], accounts[4], {from: accounts[0], value: web3.utils.toWei("2", "ether")});
        truffleAssert.eventEmitted(txResult, 'SentMoney');

        let senderAllowance = await smartWalletInst.getAllowance(accounts[3]);
        assert.equal(senderAllowance, web3.utils.toWei("8", "ether"), "Allowance expected to be 8 ether after giving allowance");

        let recipientAllowance = await smartWalletInst.getAllowance(accounts[4]);
        assert.equal(recipientAllowance, web3.utils.toWei("2", "ether"), "Allowance expected to be 2 ether after getting allowance");

        let senderAcctBalanceAfterGivingAllowance = await web3.eth.getBalance(accounts[3]);

        assert.equal(senderAcctBalanceAfterDeposit, senderAcctBalanceAfterGivingAllowance, "Allowance is expected to be from deposited money");

        let recipientAcctBalanceAfterAllowance = await web3.eth.getBalance(accounts[4]);
        assert.equal((recipientAcctBalanceAfterAllowance-senderAcctBalanceAfterGivingAllowance) > web3.utils.toWei("2", "ether"), true, "Account balance is expected to be increased by allowance amount");

        let ownerAcctBalanceAfterAllowance = await web3.eth.getBalance(accounts[0]);
        assert.equal((ownerAcctBalanceAfterDeposit-ownerAcctBalanceAfterAllowance) > web3.utils.toWei("2", "ether"), true, "Account balance is expected to be decreased by allowance amount");
    })    
})