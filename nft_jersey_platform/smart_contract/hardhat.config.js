require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/sebxAHqQ4x06D_u1i_eh-_90TAPDZ0Ye',
      accounts: ['41fc983066928c40c50ea369c6fa81f85184d8a3ac848e994eda3a08ec4ff324'],
    },
  },
};
