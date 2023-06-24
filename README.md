**Description**

This repository implements a **Smart Wallet** in solidity, inspired by the [Ethereum Blockchain Developer Bootcamp With Solidity (2023)](https://www.udemy.com/course/blockchain-developer/) Udemy course.

It uses a truffle project for the implementation, testing, and deployment. 

Included are the implementation for the `depositMoney`, `withdrawMoney`, and `giveAllowance` functions and the corresponding tests, along with the deployment script.

**To deploy and test the smart contract**
* Using the `develop` environment
  * Run `truffle develop` in a terminal, which puts you in the develop console
  * Use `migrate` to deploy the smart wallet smart contract
  * Use `test` to run the tests in the develop console
  * Use web3.js using commands such as `await web3.eth.getAccounts()` to inteact with the smart contract within the develop console

* Using the `ganache` environment
  * Run `ganache` in one terminal to start the ganache server
  * Run `truffle console --network ganache` in a separate terminal, which puts you in the gruffle console interacting with the ganache server
  * Use `migrate` to deploy the smart wallet smart contract. Can also be run outside the console by specifying the network: `truffle migrate --network ganache`
  * Use `test` to run the tests in the develop console. Can also be performed outside the console using `truffle test --network ganache`
  * Use web3.js using commands such as `await web3.eth.getAccounts()` to inteact with the smart contract within the truffle console

* Using the `dashboard` to interact with metamask
  * Run `truffle dashboard` in one terminal
  * In a separate terminal, use the commands above replacing `ganache` network with `dashboard`
