// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";

//import "truffle/console.sol";

contract SmartWallet is Ownable{
    event DepositedMoney(address sender, uint amount);
    event WithdrewMoney(address recipient, uint amount);
    event SentMoney(address sender, address recipient, uint amount);

    mapping(address => uint) public allowances;

    function getAllowance(address user) public view returns(uint) {
        return allowances[user];
    }

    function depositMoney() public payable {
        //console.log(msg.value);
        allowances[msg.sender] += msg.value;

        payable(owner()).transfer(msg.value);

        emit DepositedMoney(msg.sender, msg.value);
    }

    function withdrawMoney(address payable recipient) public payable onlyOwner {
        require(allowances[recipient] >= msg.value, "Withdraw amount larger than user's allowance");

        allowances[recipient] -= msg.value;

        payable(recipient).transfer(msg.value);

        emit WithdrewMoney(recipient, msg.value);
    }

    function giveAllowance(address sender, address payable recipient) public payable onlyOwner {
        require(allowances[sender] >= msg.value, "Allowance amount larger than remaining balance");

        allowances[recipient] += msg.value;
        allowances[sender] -= msg.value;

        payable(recipient).transfer(msg.value);
  
        emit SentMoney(msg.sender, recipient, msg.value);
    }
}