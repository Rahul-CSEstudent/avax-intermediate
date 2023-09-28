import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const FORK_FUJI = true
const FORK_MAINNET = false
let forkingData = undefined;

if (FORK_MAINNET) {
  forkingData = {
    url: 'https://api.avax.network/ext/bc/C/rpcc',
  }
}
if (FORK_FUJI) {
  forkingData = {
    url: 'https://api.avax-test.network/ext/bc/C/rpc',
  }
}


const config: HardhatUserConfig = {
    solidity: "0.8.18",
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      // chainId: !forkingData ? 43112 : undefined, //Only specify a chainId if we are not forking
      forking: forkingData,
      mining: {
        auto: false,
        interval: 2000,
      }
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [
        "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"
      ]
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [
        "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"
      ]
    }
  },
  etherscan: {
    apiKey: "DI3DCZATP2DWXDJ2RZIZD4C25FJIFT5JM5", 
  }
};

export default config;
