import "./App.css";
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useWeb3React } from "@web3-react/core";

import {
  onDisconnect,
  onConnectMetamask,
  onConnectWalletConnect,
  onConnectCoinbase,
} from "./Components/ConnectWallet/functions";

import ShowTickets from "./Components/Pages/HaveTicket";
import BuyTicket from "./Components/Pages/NoTicket";
import QrCode from "./Components/Pages/QrCode";
import Redeem from "./Components/Pages/Redeem";
import Landing from "./Components/Pages/Landing";
import TicketToken from "./ethereum/TicketToken";
import Tick from "./Components/Pages/Tick";
import BuyTickets from "./Components/Pages/BuyTicket";

import Organizer from "./Components/Pages/Organizer";
import ProtectedRoute from "./utils/ProtectedRoute";
import { config } from "./config/config";

const changeNetwork = async () => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    // console.log("switch network:", { chainId: "0x1" });
    await window.ethereum.request({
      // method: "wallet_addEthereumChain",
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: `0x${Number(config.chainId).toString(16)}`, // mumbai = 80001 // polygon = 137
        },
      ],
    });
  } catch (err) {
    if (err) console.log(err.message);
  }
};

function App() {
  const [windowDimension, setWindowDimension] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [chainId, setChainId] = useState();
  const [haveTokens, setHaveTokens] = useState(false);

  const [isOrganizer, setIsOrganizer] = useState(false);
  const [orgId, setOrgId] = useState();

  const IsMobile = windowDimension <= 800;

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  useEffect(() => {
    setWindowDimension(window.innerWidth);
    setIsMobile(IsMobile);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }
    setIsMobile(IsMobile);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [IsMobile]);

  const networkChanged = (chainId) => {
    console.log({ chainId });
    setChainId(chainId);
  };

  useEffect(() => {
    try {
      window.ethereum.on("chainChanged", networkChanged);
    } catch (err) {
      if (err) console.log(err);
    }

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  useEffect(() => {
    changeNetwork();
  }, [chainId]);

  const checkForUnredeemedTickets = async () => {
    try {
      const balance = await TicketToken.methods.balanceOf(account).call();
      if (balance > 0) setHaveTokens(true);
    } catch (err) {
      console.error(err);
    }
  };

  const checkForRedeemedTickets = async () => {
    try {
      const url = `https://jorrdaarevent.kraznikunderverse.com/qrcode/wallet/${account}`;
      const { data } = await axios.get(url, {
        headers: {
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
      // console.log(data?.data);
      if (data?.data?.length > 0) setHaveTokens(true);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfOrganizer = async () => {
    try {
      const organizers = [
        // "0x66Dc3BFCD29E24fDDeE7f405c705220E6142e4cD",
        // "0xF8eD0348ce651f1DeFb19737ab7869F5039a5059",
        "0x70c1EA05E2A54DfFE1088D4A54CB1a6C25c9077c",
        "0x4FdFe97d484929e32383E9B4Af907d0fE91864eB",
        "0x9729eDAAa4c90696920b9b531BCA345fCDde64CE",
        "0x0e7D6b0180CF0919c7b1BE08eBE35616358aCc01",
        "0x37ef5b0a412cd864e368c53f77a0de4ac64b93f1", // digitalpratik.eth
      ];

      organizers.map((org) => {
        if (account === org) {
          setIsOrganizer(true);
          return;
        }
      });
    } catch {}
  };

  useEffect(() => {
    if (account) {
      checkForRedeemedTickets();
      checkForUnredeemedTickets();
      checkIfOrganizer();
    }
  }, [account, chainId]);

  return (
    <>
      <Router>
        <Landing
          account={account}
          onConnectWalletConnect={() => onConnectWalletConnect(activate)}
          onConnectCoinbase={() => onConnectCoinbase(activate)}
          onConnectMetamask={() => onConnectMetamask(activate)}
          onDisconnect={() => {
            onDisconnect(deactivate);
            setIsOrganizer(false);
          }}
          haveTokens={haveTokens}
          isOrganizer={isOrganizer}
        />

        <Routes>
          <Route exact path="/" element={<Tick></Tick>} />
          <Route
            exact
            path="/video"
            element={<BuyTickets account={account} />}
          />
          <Route exact path="/tickets/buy" element={<BuyTicket />} />
          <Route
            exact
            path="/tickets/:id/qrcode"
            element={<QrCode account={account} />}
          />
          <Route
            exact
            path="/tickets/:id/redeem"
            element={<Redeem account={account} />}
          />
          <Route
            exact
            path="/tickets/show"
            element={<ShowTickets account={account} />}
          />
          <Route
            exact
            path="/organizer"
            element={
              <ProtectedRoute permit={isOrganizer}>
                <Organizer account={account} orgId={orgId} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
