// Reference for all the content in this repository. https://www.dappuniversity.com/articles/web3-js-intro
const Web3 = require('web3');//Importing Web3 Library
var txSigning = require('ethereumjs-tx').Transaction;// As we don't have a local node so we need to sign the transaction by ourselves locally. In case we had a local node then we don't need this library.
const urlNodeInfura="https://goerli.infura.io/v3/1ac5a0804b9f42b2ab3c6821c11f65f8"; //This is the URL of infura node. In case of local blockchain use "HTTP://127.0.0.1:8545"
const Web3_Live = new Web3(urlNodeInfura); //We have made Web3 connection live.

//1. GETTING THE BALANCE OF AN ACCOUNT::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/*Before Moving forward to getting the balance, there are two important concepts:
i. Web3_Live.eth.getBalance takes a callback function, a callback function is a function that is passed as an argument to another function. A callback function can run after
another function has finished. myCallback is a callback function in the below example.
function myCalculator(num1, num2, myCallback) {
    var a = num1+1;
    var b = num2*2;
    myCallback(a,b);
  }
  myCalculator(5, 5, function(a,b){console.log(a+b)});
  While Defining myCalculator we didn't define myCallback, this gives us the freedom to define myCallback the way we want when we will be executing myCalculator function.
ii. ES6 introducted arrow functions, so you can replace function(a,b){...} with (a,b)=>{...}. It is just to make the code shorter.*/ 
const addressOwner="0x1d8B2EFf34B6E4Dbd16098c23c656C4662d56AD7"; //EOA address to check it's balance
Web3_Live.eth.getBalance(addressOwner,(errorIfOccurred,amountReturned)=>{ //As per my understanding this function takes the address and if no error occurs then it finds out the balance.
    if(errorIfOccurred){                                                  // The balance and 'null' error are passed to callback function. At the end, callback function is executed.                 
        console.log(errorIfOccurred);
    }
    else{
        const Ather=Web3_Live.utils.fromWei(amountReturned,'ether');// Converting Wei to ether
        console.log(Ather);
    } 
})

//2. TRANSFERRING BALANCE FROM ONE ACCOUNT TO ANOTHER:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const sender="0xf699ffC8D094065aa69340b13C832A3d2b94222d";
const sender_private="3d3d1c9aff3d040e89b6d20f681edd2f5751099775cfb346ee540883fab20e93"//This is the private key of the sender which is required to sign the transaction
const binaryFormat=Buffer.from(sender_private,'hex');//Private key is converted to string of binary data from Hex.
const receiver="0x1d8b2eff34b6e4dbd16098c23c656c4662d56ad7";
//a. Build the Transaction 
Web3_Live.eth.getTransactionCount(sender,(errr,txCount)=> {
    const txObject = {
        nonce: Web3_Live.utils.toHex(txCount), //Web3_Live.utils.toHex is used to convert any value to hex format
        to: receiver,
        value: Web3_Live.utils.toHex(Web3_Live.utils.toWei('0.005','ether')), //Web3_Live.utils.toWei is used to convert ether to Wei
        gasLimit: Web3_Live.utils.toHex(21000),
        gasPrice: Web3_Live.utils.toHex(Web3_Live.utils.toWei('40','gwei'))}
//b. Signing Transaction
    const intiateTxSignLib = new txSigning(txObject,{chain:'goerli'}); //In case of local blockchain, const intiateTxSignLib = new txSigning(txObject)
    intiateTxSignLib.sign(binaryFormat);
    const serialize=intiateTxSignLib.serialize();
    const raw = '0x'+ serialize.toString('hex');
//c. Braodcast the Transaction
    Web3_Live.eth.sendSignedTransaction(raw,(erro,txHash)=>{
    console.log("Transaction Hash:",txHash);
    })
})

