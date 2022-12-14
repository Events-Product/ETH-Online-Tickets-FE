import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4",
  4: "https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4",
  80001:
    "https://polygon-mumbai.g.alchemy.com/v2/T95ylN-bR7zmaXiaZkP0R1sOObutgv-M",
  420: "https://opt-goerli.g.alchemy.com/v2/sNcVde-i7VmacXUQCQ-o_RrVyJyttTwX",
};

//metamask
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 137, 80001, 420],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1],
    4: RPC_URLS[4],
    80001: RPC_URLS[80001],
    420: RPC_URLS[420],
  },
  qrcode: true,
  pollingInterval: 15000,
});

export function resetWalletConnector(connector) {
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
}

//coinbase
export const walletlink = new WalletLinkConnector({
  // url: RPC_URLS[4],
  url: RPC_URLS[1],
  appName: "JorrDaar Event",
  supportedChainIds: [1, 4, 80001, 420],
});
