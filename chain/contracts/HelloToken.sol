//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HelloToken is ERC20 {
    constructor(uint supply) ERC20("HelloToken", "HLT") {
        _mint(msg.sender, supply);
    }
}