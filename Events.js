// Reference for all the content in this repository. https://www.dappuniversity.com/articles/web3-js-intro
//We can see and listen the past events emitted by Smart Contract

const Weeb3= require('web3');
const infGoerliURL= "https://goerli.infura.io/v3/1ac5a0804b9f42b2ab3c6821c11f65f8";
const initiateWeb3 = new Weeb3(infGoerliURL);
const contractAddress= "0x17FE10D0edCE147FBF06d3df8AB8cd982AaE4311";
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Agee",
		"type": "event"
	},
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
const JsRepContract = new initiateWeb3.eth.Contract(abi,contractAddress);
//Getting the past events isn't a transaction.
JsRepContract.getPastEvents(
    'AllEvents', //If you want to get any specific event, just enter its name here.
    {
        fromBlock: 0, //You want to listen events from the genesis block till the latest created block for this smart contract.
        toBlock: 'latest',
    },
    (eeror,eventsReturned)=>{  //JsRepContract.getPastEvents will return eeror and eventsReturned which will be passed into the arrow function.
        console.log(eventsReturned);
    }
)