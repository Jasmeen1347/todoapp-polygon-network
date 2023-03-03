/* eslint-disable no-undef */
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import contractAbi from './abi/abi.json'
import { ethers } from 'ethers';
const contractAddress = "0x25B1976289aC1c178D4a8d412546A92835DcB1aE"

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    account: null
  })

  const [reload, setReload] = useState(false)

  useEffect(() => {
    connectWallet();
    const { ethereum } = window;
    if (ethereum) {
      window.ethereum.on('accountsChanged', () => {
        connectWallet()
      })
    } else {
      alert('Please Install Metamask')
    }
  }, [])

  const connectWallet = async () => {
    try {

      const { ethereum } = window;
      
      if (ethereum) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        const provider =  new ethers.providers.Web3Provider(window.ethereum)
        const signer =  provider.getSigner();
        const contract =  new ethers.Contract(contractAddress, contractAbi, signer)
        setState({ provider, signer, contract, account: accounts[0] })
      }


    } catch (error) {
      alert('Please Install Metamask')
    }
  }

  return (
    <div className="container">
      <h1>Todo App with Blockchain</h1>
      {state.account && (
        <>
          <TodoForm state={state} reload={reload} setReload={setReload} contractAddress={contractAddress} />
          <Todo state={state} reload={reload} contractAddres={contractAddress} />
        </>
      )}

    </div>
  );
}

export default App;
