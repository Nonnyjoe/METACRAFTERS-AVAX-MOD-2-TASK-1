import { ethers } from "hardhat";

async function main() {

  const DegenToken = await ethers.deployContract("DegenToken");
  await DegenToken.deployed()

  console.log( `DegenToken deployed to ${DegenToken.address}`);


    const [owner, user1, user2] = await ethers.getSigners();
    console.log("owner is", owner.address);
    
    const degenToken = await ethers.getContractAt("DegenToken", DegenToken.address);

    // get name of the token
    const name = await degenToken.name();
    console.log("Token name is", name);

    //get symbol of the token
    const symbol = await degenToken.symbol();
    console.log("Token symbol is", symbol);

    //mint tokens to user1
    console.log("Minting 100 tokens to user1");
    const mint = await degenToken.connect(owner).mint(user1.address, ethers.utils.parseEther('100'));
    await mint.wait();
    console.log("Mint successful");

    //Verify User1 balance
    const balance = await degenToken.balanceOf(user1.address);
    console.log("User1 balance is", ethers.utils.formatEther(balance));

    //Initiate tokens transfer from user1 to user2
    console.log("Transferreing 50 tokens from user1 to user2");
    const transfer = await degenToken.connect(user1).transfer(user2.address, ethers.utils.parseEther('50'));
    await transfer.wait();
    console.log("Transfer Succesful");

    //Verify User2 balance
    const balance2 = await degenToken.balanceOf(user2.address);
    console.log("User2 balance is", ethers.utils.formatEther(balance2));

    //Verify User1 balance
    const balance3 = await degenToken.balanceOf(user1.address);
    console.log("User1 balance after transfer is", ethers.utils.formatEther(balance3));

    //burn the tokens
    const burn = await degenToken.connect(user1).burn(ethers.utils.parseEther('5'));
    await burn.wait();
    console.log("Burned 5 tokens from user1");

    //check balance after burn
    const balance4 = await degenToken.balanceOf(user1.address);
    console.log("User1 balance after burn is", ethers.utils.formatEther(balance4));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});