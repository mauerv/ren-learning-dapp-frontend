import React from "react";
import Web3 from "web3";
import "./App.css";

import ABI from "./ABI.json";

const contractAddress = "0x3Aa969d343BD6AE66c4027Bb61A382DC96e88150";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      message: "",
      error: "",
    };
  }

  componentDidMount = async () => {
    let web3Provider;

    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
        this.logError("Please allow access to your Web3 wallet.");
        return;
      }
    } else if (window.web3) {
      web3Provider = window.web3.currentProvider;
    } else {
      this.logError("Please install MetaMask!");
      return;
    }

    const web3 = new Web3(web3Provider);
    const networkID = await web3.eth.net.getId();
    if (networkID !== 42) {
      this.logError("Please set your network to Kovan.");
      return;
    }

    this.setState({ web3 }, () => {
      this.updateBalance();
      setInterval(() => {
        this.updateBalance();
      }, 10 * 1000);
    });
  };

  render = () => {
    const { balance, message, error } = this.state;
    return (
      <div className="App">
        <p>Balance: {balance} BTC</p>
        <p>
          <button onClick={() => this.deposit().catch(this.logError)}>
            Deposit 0.001 BTC
          </button>
        </p>
        <p>
          <button onClick={() => this.withdraw().catch(this.logError)}>
            Withdraw {balance} BTC
          </button>
        </p>
        <p>{message}</p>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
      </div>
    );
  };

  updateBalance = async () => {
    const { web3 } = this.state;
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const balance = await contract.methods.balance().call();
    this.setState({ balance: parseInt(balance.toString()) });
  };

  logError = (error) => {
    console.error(error);
    this.setState({ error: String((error || {}).message || error) });
  };

  log = (message) => {
    this.setState({ message });
  };

  deposit = async () => {
    this.logError("");
  };

  withdraw = async () => {
    this.logError("");
  };
}

export default App;
