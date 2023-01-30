const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
      const SimpleStorageFactory = await ethers.getContractFactory(
            "SimpleStorage"
      );
      console.log("Deploying, please wait...");
      const SimpleStorage = await SimpleStorageFactory.deploy();
      await SimpleStorage.deployed();

      console.log(`Contract deployed at ${SimpleStorage.address}`);

      if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
            console.log("Waiting for block txes...");
            await SimpleStorage.deployTransaction.wait(6);
            verify(SimpleStorage.address, []);
      }

      const currentValue = await SimpleStorage.retrieve();
      console.log(`Current value is ${currentValue}`);

      const transactionResponse = await SimpleStorage.store(777);
      await transactionResponse.wait(1);
      const updatedValue = await SimpleStorage.retrieve();
      console.log(`Updated value is ${updatedValue}`);
}

async function verify(contractAddress, args) {
      console.log("Verifying contract...");
      try {
            await run("verify:verify", {
                  address: contractAddress,
                  constructorArguments: args,
            });
      } catch (e) {
            if (e.message.toLowerCase().includes("already verified")) {
                  console.log("Already verified!");
            } else {
                  console.log(e);
            }
      }
}

main()
      .then(() => process.exit(0))
      .catch((error) => {
            console.error(error);
            process.exit(1);
      });
