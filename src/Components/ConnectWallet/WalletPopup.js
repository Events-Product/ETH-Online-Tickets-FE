import React from "react";
import styled from "styled-components";
import Metamask from "../../assets/Metamask.svg";
import CoinbaseWallet from "../../assets/CoinbaseWallet.svg";
import WalletConnect from "../../assets/WalletConnect.svg";

const Container = styled.div`
  /* height: 900px;
  width: 1440px; */
  height: 100vh;
  width: 100vw;
  left: 0px;
  top: 0px;
  border-radius: 0px;
  backdrop-filter: blur(3px);
  /* background-color: black; */
  /* opacity: 40%; */
  /* z-index: 10; */

  /* margin: -100px; */

  display: grid;
  align-items: center;
  justify-items: center;

  @media (max-width: 800px) {

    margin: 0 0 0 0;
    height: 00px;
    width: 0px;
  }
`;

const WalletContainer = styled.div`
  /* z-index: 1000; */
  flex-direction: column;
  justify-content: center;
  padding: 24px 24px 48px;
  position: absolute;
  width: 530px;
  height: 456px;
  background: #ffffff;
  /* opacity: 100%; */
  border-radius: 4px;
  border: 1px solid black;
  /* margin: 50px 0 0 -100px; */
  margin-top: -30vh;

  @media (max-width: 800px) {
    margin: -200px 0 0 -190px;
    padding: 72px 0 0 0;
    width: 373px;
    height: 456px;
  }
`;

const Title = styled.div`
  font-family: "Knockout";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  margin: 48px 56px 0 146px;
  display: flex;
  align-items: center;
  text-align: center;

  /* Green Leaf */

  color: #354b37;

  @media (max-width: 800px) {
    margin: 0 60px;
    font-size: 24px;
    line-height: 24px;
  }
`;

const Description = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */
  margin: 24px 56px;
  text-align: center;
  padding-bottom: 24px;
  /* Green Leaf */

  color: #354b37;

  @media (max-width: 800px) {
    padding: 0 0 24px 0;
    font-size: 16px;
  }
`;

const ConnectBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 16px;
  margin: 16px 0 0 0;
  width: 482px;
  height: 56px;

  /* White */

  background: #ffffff;
  /* Green Leaf */

  border: 0.5px solid #354b37;
  border-radius: 60px;

  @media (max-width: 800px) {
    margin: 16px;
    width: 311px;
    height: 56px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.div``;

const Name = styled.div``;

const WalletPopUp = ({
  closeModal,
  onConnectMetamask,
  onConnectWalletConnect,
  onConnectCoinbase,
}) => {
  return (
    <>
      <Container>
        <WalletContainer>
          <a
            style={{
              cursor: "pointer",
              float: "right",
            }}
            className="close"
            onClick={closeModal}
          >
            &times;
          </a>
          <Title>Connect Your Wallet</Title>
          <Description>
            You need to be connected to access to your (NFT ticket) and get your
            QR code
          </Description>

          <ConnectBox onClick={onConnectMetamask}>
            <Logo>
              <img src={Metamask}></img>
            </Logo>
            <Name>Metamask</Name>
          </ConnectBox>

          <ConnectBox onClick={onConnectCoinbase}>
            <Logo>
              <img src={CoinbaseWallet} width="22px" height="24px"></img>
            </Logo>
            <Name>Coinbase Wallet</Name>
          </ConnectBox>

          <ConnectBox onClick={onConnectWalletConnect}>
            <Logo>
              <img src={WalletConnect}></img>
            </Logo>
            <Name>WalletConnect</Name>
          </ConnectBox>
        </WalletContainer>
      </Container>
    </>
  );
};

export default WalletPopUp;
