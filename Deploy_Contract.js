// Reference for all the content in this repository. https://www.dappuniversity.com/articles/web3-js-intro
const Web3 = require("web3");
const transSign=require("ethereumjs-tx").Transaction;
const infGoerliURL="https://goerli.infura.io/v3/1ac5a0804b9f42b2ab3c6821c11f65f8";
const initiateWeb3 = new Web3(infGoerliURL);
const transactionSenderAddress="0x1d8B2EFf34B6E4Dbd16098c23c656C4662d56AD7";
const privateKeySender= "5e579959b0a016735970f266330dfeb7eb31d0b8a0af8bc268a13c347e2bc629";
const BinaryFormatPrivateKey = Buffer.from(privateKeySender,'hex');

//In order to deploy the contract, we first need object from the bytecode generated on Remix. 
const bytecode="608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063b96228231461003b578063c8b1d6e314610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea26469706673582212200df9755dfa929a0cb439f640162c27c559af5b0926a695cb0c153a590d27eb3b64736f6c63430008110033";
const BinaryFormatofByte=Buffer.from(bytecode,'hex');
initiateWeb3.eth.getTransactionCount(transactionSenderAddress,(error,transactionCount)=>{
    const traxObject={
        nonce: initiateWeb3.utils.toHex(transactionCount),
        gasLimit: initiateWeb3.utils.toHex(800000), //Deploying the Contract Requires more Gas
        gasPrice: initiateWeb3.utils.toHex(initiateWeb3.utils.toWei('40', 'gwei')),
        data: BinaryFormatofByte
    }
    const Signtrans=new transSign(traxObject,{chain:'goerli'});
    Signtrans.sign(BinaryFormatPrivateKey);
    const serillize=Signtrans.serialize();
    const raww='0x'+serillize.toString('hex');
    initiateWeb3.eth.sendSignedTransaction(raww,(errorr,transshash)=>{
        console.log('Transaction Hash:',transshash);
    })
})
