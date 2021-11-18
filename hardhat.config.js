const { projectId, account_key } = require('./secrets.json'); 
require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
      gas: 12000000,
      allowUnlimitedContractSize: true,
      blockGasLimit: 50000000,
      timeout: 1500000
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${projectId}`,
      accounts: [`0x${account_key}`]
    }
  }
};
