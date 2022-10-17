// Reference for all the content in this repository. https://www.dappuniversity.com/articles/web3-js-intro
const Weeb3= require('web3');
const infGoerliURL= "https://goerli.infura.io/v3/1ac5a0804b9f42b2ab3c6821c11f65f8";
const initiateWeb3 = new Weeb3(infGoerliURL);

//1. get latest block number
initiateWeb3.eth.getBlockNumber().then(console.log)
//2. get latest block
initiateWeb3.eth.getBlock('latest').then(console.log)
//3. get latest 3 blocks
initiateWeb3.eth.getBlockNumber().then((latest) => {
  for (let i = 0; i < 3; i++) {
    initiateWeb3.eth.getBlock(latest - i).then(console.log)
  }
})
//4. get specific transaction from a specific block
const hash = '0x7d881c59de39574bff51ee6c1f416e0d885272169586b7dc58c10f414dc15fc6'
initiateWeb3.eth.getTransactionFromBlock(hash,0).then(console.log) //0 represents the position/transactionIndex in the block 
//5. Get average gas price in wei from last few blocks median gas price
initiateWeb3.eth.getGasPrice().then((result) => {
  console.log(initiateWeb3.utils.fromWei(result, 'ether'))
})
//6. Use sha256 Hashing function
console.log(initiateWeb3.utils.sha3('Dapp University'))
//7. Use keccak256 Hashing function (alias)
console.log(initiateWeb3.utils.keccak256('Dapp University'))
//8. Get a Random Hex
console.log(initiateWeb3.utils.randomHex(32))
