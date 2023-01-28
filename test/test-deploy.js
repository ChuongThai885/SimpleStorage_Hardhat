const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
      let SimpleStorageFactory, SimpleStorage;
      beforeEach(async function () {
            SimpleStorageFactory = await ethers.getContractFactory(
                  "SimpleStorage"
            );
            SimpleStorage = await SimpleStorageFactory.deploy();
      });

      it("Should start with number 0", async function () {
            const currentValue = await SimpleStorage.retrieve();
            const expectedValue = "0";
            assert.equal(currentValue.toString(), expectedValue);
      });

      it("Should update when we call store()", async function () {
            const expectedValue = "297";
            const transactionResponse = await SimpleStorage.store(
                  expectedValue
            );
            await transactionResponse.wait(1);

            const currentValue = await SimpleStorage.retrieve();
            assert.equal(currentValue, expectedValue.toString());
      });
});
