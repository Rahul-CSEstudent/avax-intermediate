# DegenToken Smart Contract on Avalanche Fuji

This implements the ERC-20 token standard and includes additional functionality for minting, transferring, redeeming, and burning tokens. This contract also incorporates an ownership mechanism for access control.

## Features

- **Minting**: The contract owner can mint new tokens and assign them to specific addresses.
- **Transfers**: Users can transfer tokens to other addresses while ensuring proper balance checks.
- **Redeeming Assets**: Users can burn tokens, providing an associated message, which triggers a custom event.
- **Burning Tokens**: Users can burn (destroy) a specified amount of their own tokens.
- **Access Control**: The contract owner has exclusive rights to mint tokens.

## Usage

The DegenToken contract can be accessed and interacted with on the Avalanche Fuji blockchain, allowing users to leverage Avalanche's high-performance infrastructure for token operations. Deploy the contract on Avalanche Fuji and use Avalanche-compatible wallets or scripts to interact with its functions.

## Testing

This repository includes a set of test cases using the Hardhat testing framework to ensure the contract's functionality is working as expected in the Avalanche Fuji environment.

## Setup

To set up the project, follow these steps:

1. Ensure that the avalanche network is properly configured to function with this project.
2. Set the private keys before development.
3. Run the following command to start the localnet with a 2-second block mining delay and fork the Fuji testnet of Avalanche:

   ```
   npm run node
   ```

4. To test the contract on the Fuji testnet, run the following command:

   ```
   npm run test-fuji
   ```


## License

This project is open-source and is licensed under the MIT License.

## Author

Rahul B
