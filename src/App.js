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

  componentDidMount = async () => {};

  render = () => {};

  updateBalance = async () => {};

  logError = (error) => {};

  log = (message) => {};

  deposit = async () => {};

  withdraw = async () => {};
}

export default App;
