import {
  injected,
  walletconnect,
  resetWalletConnector,
  walletlink,
} from "../../utils/wallet/connectors";

//web3react
export const onDisconnect = (deactivate) => {
  try {
    deactivate();
  } catch (ex) {
    console.log(ex);
  }
};

// //web3react context
// export const checkInfoSimple = async () => {
//   try {
//     console.log("web3reactContext");
//     console.log(web3reactContext);
//   } catch (ex) {
//     console.log(ex);
//   }
// };

//web3react metamask
export const onConnectMetamask = async (activate) => {
  try {
    await activate(injected);
  } catch (ex) {
    console.log(ex);
  }
};

//web3react walletconnect
export const onConnectWalletConnect = async (activate) => {
  try {
    resetWalletConnector(walletconnect);
    await activate(walletconnect);
  } catch (ex) {
    console.log(ex);
  }
};

//web3react coinbase
export const onConnectCoinbase = async (activate) => {
  try {
    await activate(walletlink);
  } catch (ex) {
    console.log(ex);
  }
};
