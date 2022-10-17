// Reference for all the content in this repository. https://www.dappuniversity.com/articles/web3-js-intro
const Web3 = require("web3");//Importing Web3 Library
const transSign=require("ethereumjs-tx").Transaction;// As we don't have a local node so we need to sign the transaction by ourselves locally. In case we had a local node then we don't need this library.
const infGoerliURL="https://goerli.infura.io/v3/1ac5a0804b9f42b2ab3c6821c11f65f8";//This is the URL of infura node. In case of local blockchain use "HTTP://127.0.0.1:8545"
const initiateWeb3 = new Web3(infGoerliURL);//We have made Web3 connection live.
const addressContract = "0x8974eD76bb06729E29C8E9Ae4Afd844142371591";
const transactionSenderAddress="0x1d8B2EFf34B6E4Dbd16098c23c656C4662d56AD7";
const privateKeySender= "5e579959b0a016735970f266330dfeb7eb31d0b8a0af8bc268a13c347e2bc629";
const BinaryFormatPrivateKey = Buffer.from(privateKeySender,'hex'); //Private key is converted to string of binary data from Hex.

//1. EXECUTING THE FUNCTION OF A CONTRACT:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//i. Creating JavaScript Representation of Smart Contract
const ABII=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "enterAge",
				"type": "uint256"
			}
		],
		"name": "set_Age",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_Age",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const jsContract = new initiateWeb3.eth.Contract(ABII,addressContract);//Creates JavaScript Representation of the Smart Contract
console.log(jsContract.methods);// It will return the methods implemented in this contract
//ii. Create the transaction
initiateWeb3.eth.getTransactionCount(transactionSenderAddress,(errror,transCount)=>{
    const transObject={
        nonce: initiateWeb3.utils.toHex(transCount),//initiateWeb3.utils.toHex convert any value to hex format
        to: addressContract,
        gasLimit: initiateWeb3.utils.toHex(80000), //It can't be 21000 for executing the function, because it is less to execute it.
        gasPrice: initiateWeb3.utils.toHex(initiateWeb3.utils.toWei('40','gwei')),
        data: jsContract.methods.set_Age(400).encodeABI()
    }
//iii. Signing the transaction
    const initiateSigning= new transSign(transObject,{chain: 'goerli'});
    initiateSigning.sign(BinaryFormatPrivateKey);
    const serializze = initiateSigning.serialize();
    const raw = '0x' + serializze.toString('hex'); 

//iv. Broadcast the transaction
    initiateWeb3.eth.sendSignedTransaction(raw,(errro,transhash)=>{
        console.log("Transaction Hash:", transhash);
    })
})

//2. ALLING THE FUNCTION OF A SMART CONTRACT:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
jsContract.methods.get_Age().call((err,Value)=>{ //Calling get_Age function. Please keep in mind that it is not a transaction so when the whole file is runned this function will
    console.log(Value);                          //return before the above transaction is completed.
})