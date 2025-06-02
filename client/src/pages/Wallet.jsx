import Web3 from "web3";
import { ABI } from "../../ABI";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

function Wallet({ saveState }) {
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      console.log("MetaMask is installed");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);
        const web3 = new Web3(window.ethereum);
        const contractAddress = "0x7104dee61b7607495179642B0a453a2B6D49b782";
        const contractInstance = new web3.eth.Contract(ABI, contractAddress);

        saveState({
          web3: web3,
          account: accounts[0],
          contract: contractInstance,
        });
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  return (
    <>
      <Navigation />

      <div>Wallet</div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </>
  );
}

export default Wallet;
