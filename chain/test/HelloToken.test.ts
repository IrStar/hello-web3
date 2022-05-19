import { expect } from "chai";
import { ethers } from "hardhat";

describe("HelloToken Initial Supply", function () {
  it("Should have the correct initial supply", async function () {
    const initialSupply = ethers.utils.parseEther('10000.0')
    const HelloToken = await ethers.getContractFactory("HelloToken");
    const token = await HelloToken.deploy(initialSupply);
    await token.deployed();

    expect(await token.totalSupply()).to.equal(initialSupply);
  });
});