const Web3= require('web3');//Importing Web3
var txSigning = require('ethereumjs-tx').Transaction;// As we don't have a local node so we need to sign the transaction by ourselves locally. In case we had a local node then we don't need it.
const urlNodeInfura="https://goerli.infura.io/v3/1ac5a0804b9f42b2ab3c6821c11f65f8";//In case of local blockchain use "HTTP://127.0.0.1:8545"
const Web3_Live = new Web3(urlNodeInfura); //We have made Web3 connection live.
const addressOwner="0x1d8B2EFf34B6E4Dbd16098c23c656C4662d56AD7";//EOA address to check it's balance
Web3_Live.eth.getBalance(addressOwner,(errorIfOccurred,amountReturned)=>{//It will return the balance of given address
    if(errorIfOccurred){
        console.log(errorIfOccurred);
    }
    else{
        const Ather=Web3_Live.utils.fromWei(amountReturned,'ether');// Converting Wei to ether
        console.log(Ather);
    }
    
})
const contractAddress = "0xaF7EFa0424EDFd873f17E45f83045cA7a0Fe9455";//contract address whose function we want to call
const ABI = [
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
const jsRepOfSmartContract = new Web3_Live.eth.Contract(ABI,contractAddress);//Creating JavaScript Representation of the Smart Contract
jsRepOfSmartContract.methods.get_Age().call((err,Value)=>{ //Calling get_Age function
    console.log(Value);
})

//TRANSFERRING BALANCE FROM ONE ACCOUNT TO ANOTHER
const sender="0xf699ffC8D094065aa69340b13C832A3d2b94222d";
const sender_private="3d3d1c9aff3d040e89b6d20f681edd2f5751099775cfb346ee540883fab20e93"//This is the private key of the sender which is required to sign the transaction
const binaryFormat=Buffer.from(sender_private,'hex');//Private key is converted to string of binary data from Hex.
const receiver="0x1d8b2eff34b6e4dbd16098c23c656c4662d56ad7";
Web3_Live.eth.getTransactionCount(sender,(errr,txCount)=> {
    const txObject = {
        nonce: Web3_Live.utils.toHex(txCount), //Web3_Live.utils.toHex is used to convert any value to hex format
        to: receiver,
        value: Web3_Live.utils.toHex(Web3_Live.utils.toWei('0.005','ether')), //Web3_Live.utils.toWei is used to convert ether to Wei
        gasLimit: Web3_Live.utils.toHex(21000),
        gasPrice: Web3_Live.utils.toHex(Web3_Live.utils.toWei('40','gwei'))
    }
    const intiateTxSignLib = new txSigning(txObject,{chain:'goerli'});
    intiateTxSignLib.sign(binaryFormat);
    const serialize=intiateTxSignLib.serialize();
    const raw = '0x'+ serialize.toString('hex');
    Web3_Live.eth.sendSignedTransaction(raw,(erro,txHash)=>{
    console.log("Transaction Hash:",txHash);
    })
})

