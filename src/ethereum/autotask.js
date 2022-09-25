const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");
const axios = require("axios");
const Web3EthAbi = require("web3-eth-abi");

// Main function, exported separately for testing
exports.main = async function (signer, recipient, payload) {
  // Check relayer balance via the Defender network provider
  const relayer = await signer.getAddress();
  console.log("relayer: ", relayer);

  let events = payload.events;

  for (let i = 0; i < events.length; i++) {
    let evt = events[i];
    console.log("transaction: ");
    console.log(evt.transaction.logs[1]);
    const to = evt.transaction.from;
    const burn_hash = evt.transaction.transactionHash;

    const block_number = parseInt(evt.transaction.blockNumber, 16);

    const token_id_topic_hash = evt.transaction.logs[1].topics[3];
    const token_id = Web3EthAbi.decodeParameter("uint256", token_id_topic_hash);

    console.log("token id: ", token_id);

    const url = "https://ethglobalhacktickets.kraznikunderverse.com/qrcode";
    const tkt_data = {
      walletAddress: to,
      tokenID: token_id,
      hash: burn_hash,
    };
    await axios.post(url, tkt_data, {
      headers: {
        "Content-Type": "application/json",
        validate: "alpha romeo tango",
      },
    });
  }

  return;
};

// Entrypoint for the Autotask
exports.handler = async function (event) {
  const {
    body, // Object with JSON-parsed POST body
    headers, // Object with key-values from HTTP headers
    queryParameters, // Object with key-values from query parameters
  } = event.request;
  // Initialize defender relayer provider and signer
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, {
    speed: "fast",
  });
  const payload = body;

  return exports.main(signer, await signer.getAddress(), payload); // Send funds to self
};
