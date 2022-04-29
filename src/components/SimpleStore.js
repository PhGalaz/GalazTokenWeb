import React, { useState } from 'react';
import { ethers } from 'ethers';


const SimpleStore = () => {

  const contractAddress = undefined
  const abi = undefined
  const SimpleStore_abi = undefined

  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [connButtonText, setConnButtonText] = useState('Connect Wallet')

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum){
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountChangedHandler(result[0]);
        setConnButtonText('Wallet Connected');
      })
    } else {
      setErrorMessage('Need to install Metamask');
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  }

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, SimpleStore_abi, tempSigner);
    setContract(tempContract);
  }

  return (
    <React.Fragment>
      <h3> {"Get/Set Interaction with contract!"} </h3>
      <button
        onClick={connectWalletHandler}
      >
        {connButtonText}
      </button>
      <h3> Addres: {defaultAccount} </h3>
    </React.Fragment>
  );
}


export default SimpleStore;
