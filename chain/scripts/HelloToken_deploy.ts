import { ethers } from "hardhat";

async function main() {
  const initialSupply = ethers.utils.parseEther('10000.0')
  const HelloToken = await ethers.getContractFactory("HelloToken");
  const token = await HelloToken.deploy(initialSupply);
  await token.deployed();
  console.log("HelloToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});