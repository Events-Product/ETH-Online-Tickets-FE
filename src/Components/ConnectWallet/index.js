import { useWeb3React } from "@web3-react/core";

import React from "react";

import {
  onDisconnect,
  onConnectMetamask,
  onConnectWalletConnect,
  onConnectCoinbase,
} from "./functions";

const ConnectWallet = () => {
  //connector, library, chainId, account, activate, deactivate
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  return (
    <div className="flex flex-col space-y-7 items-start pt-10 w-1/2 border-2 border-yellow-300">
      <h2>Web3React Control</h2>
      {account ? <p>{account}</p> : <p>Not connected</p>}
      <div className="flex space-x-3">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onDisconnect(deactivate)}
        >
          Disconnect
        </button>
      </div>
      <div className="flex space-x-3">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onConnectMetamask(activate)}
        >
          Connect Metamask
        </button>
      </div>
      <div className="flex space-x-3">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onConnectWalletConnect(activate)}
        >
          Connect Wallet Connect
        </button>
      </div>
      <div className="flex space-x-3">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onConnectCoinbase(activate)}
        >
          Connect Coinbase
        </button>
      </div>
    </div>
  );
};

export default ConnectWallet;
