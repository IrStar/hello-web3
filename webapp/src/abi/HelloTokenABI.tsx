export const HelloTokenABI = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint)",
    "function totalSupply() view returns (uint)",
    "function symbol() view returns (string)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)",
];