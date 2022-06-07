/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 * 
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();
const HDWalletProvider = require("@truffle/hdwallet-provider");

// put your private keys from metamask above

const private_keys = ["PRIVATE KEYS HERE"
,"PRIVATE KEYS HERE",
"PRIVATE KEYS HERE"]


module.exports = {
  // Useful for testing. The `development` name is special - truffle uses it by default
  // if it's defined here and no other network is specified at the command line.
  // You should run a client (like ganache-cli, geth or parity) in a separate terminal
  // tab if you use this network and you must also set the `host`, `port` and `network_id`
  // options below to some value.
  //
  // development: {
  //  host: "127.0.0.1",     // Localhost (default: none)
  //  port: 8545,            // Standard Ethereum port (default: none)
  //  network_id: "*",       // Any network (default: none)
  // },
  // Another network with more advanced options...
  // advanced: {
  // port: 8777,             // Custom port
  // network_id: 1342,       // Custom network
  // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
  // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
  // from: <address>,        // Account to send txs from (default: accounts[0])
  // websocket: true        // Enable EventEmitter interface for web3 (default: false)
  // },
  // Useful for deploying to a public network.
  // NB: It's important to wrap the provider as a function.
  plugins: ['truffle-plugin-verify'],

  api_keys: {
    etherscan: "ETHERSCAN API" //
  },
  networks:{
    rinkeby: {
      provider: () => new HDWalletProvider({
        privateKeys: private_keys,
        providerOrUrl: "https://rinkeby.infura.io/v3/f16abf6407b04cdba3237d0a0b9802a4",
        numberOfAddresses: 3,
      }),
      network_id: 4,
      networkCheckTimeout: 999999,
      gas: 5500000,
      confirmations: 2,
      timeOutBlocks: 200,
      skipDryRun: true
      //}),
      // network_id: 4,
      // gas: 5500000,
      // confirmations: 10,
      // timeOutBlocks: 200,
      // skipDryRun: true
    },
  },
  // ropsten: {
  // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
  // network_id: 3,       // Ropsten's id
  // gas: 5500000,        // Ropsten has a lower block limit than mainnet
  // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
  // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
  // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
  // },
  // Useful for private networks
  // private: {
  // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
  // network_id: 2111,   // This network is yours, in the cloud.
  // production: true    // Treats this network as if it was a public net. (default: false)
  // }

  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.8.13", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

};


// 
// truffle run verify Crud --network rinkeby