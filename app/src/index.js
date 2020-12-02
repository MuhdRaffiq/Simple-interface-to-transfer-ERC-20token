import Web3 from "web3";
import bodoToken from "../../build/contracts/SampleToken.json";

const App = {
    web3: null,
    account: null,
    meta: null,
    

    start: async function() {
        const { web3 } = this;
    
        try {
          // get contract instance
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = bodoToken.networks[networkId];
          this.meta = new web3.eth.Contract(
            bodoToken.abi,
            deployedNetwork.address,
          );  

          /*this.meta = new web3.eth.Contract(ABIcode, contractAddress);
          console.log(meta); */
    
          // get accounts
          const accounts = await web3.eth.getAccounts();
          this.account = accounts[0];
        } catch (error) {
          console.error("Could not connect to contract or chain.");
        }
    },

    setStatus: function(message) {
      const status = document.getElementById("status");
      status.innerHTML = message;
    },
 

    // put function call here

    transferFrom: async function() {
      const { transferFrom } = this.meta.methods;
      const { approve } = this.meta.methods;
      const ownerWallet = document.getElementById("fromWallet").value;
      const sendToWallet = document.getElementById("toWallet").value;
      const tokenSend = document.getElementById("ammountToken").value;
      await approve(ownerWallet, tokenSend);
      await transferFrom(ownerWallet, sendToWallet, tokenSend);
      App.setStatus("token has been send from "+ ownerWallet + " to " + sendToWallet+ " with " + tokenSend + " PHII.");
    },

    

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"),);
  }

  App.start();
});