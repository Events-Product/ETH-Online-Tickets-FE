import React, { useEffect, useState } from "react";
import { Description } from "../NoTicket";
import styled from "styled-components";
import NormalTicket from "../../../assets/Ticket.svg";
import VIP from "../../../assets/VIP.svg";
import VVIP from "../../../assets/VVIP.svg";
import RVVIP from "../../../assets/RVVIP.svg";
import RVIP from "../../../assets/RVIP.svg";
import RTicket from "../../../assets/RTicket.svg";
import TicketToken from "../../../ethereum/TicketToken";
import { Link } from "react-router-dom";
import axios from "axios";
const Web3EthAbi = require("web3-eth-abi");

const Background = styled.div`
  background: #151515;
  padding-bottom: 22%;
  padding-top: 5%;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: inline-block;
  width: 1000px;
  padding: 50px 0px;
  background: white;
  border-radius: 4px;
  border: 1px solid black;
  /* margin-left: 15%; */

  @media (max-width: 700px) {
    width: 343px;
  }
`;

const Title = styled.div`
  font-family: "Knockout";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  align-items: center;
  text-align: center;
  padding-bottom: 24px;

  color: #354b37;
`;

const TicketContainer = styled.div`
  margin: 0 5%;
`;

const TicketBox = styled.div`
  display: inline-block;
  margin-right: 10px;
  position: static;
  border: 1px solid black;
  display: inline-block;
  margin: 20px 20px;
  border-radius: 4px;

  padding: 0px 0px 10px 0px;
  overflow: hidden;
`;

const TicketImage3 = styled.div`
  background-image: url(${NormalTicket});
  width: 250px;
  height: 250px;
  border-bottom: 1px solid #f2f2f2;
`;

const TicketImage2 = styled.div`
  background-image: url(${VIP});
  width: 250px;
  height: 250px;
  border-bottom: 1px solid #f2f2f2;
`;

const TicketImage1 = styled.div`
  background-image: url(${VVIP});
  width: 250px;
  height: 250px;
  border-bottom: 1px solid #f2f2f2;
`;

const RedeemImage1 = styled.div`
  background-image: url(${RVVIP});
  width: 250px;
  height: 250px;
  border-bottom: 1px solid #f2f2f2;
`;

const RedeemImage2 = styled.div`
  background-image: url(${RVIP});
  width: 250px;
  height: 250px;
  border-bottom: 1px solid #f2f2f2;
`;

const RedeemImage3 = styled.div`
  background-image: url(${RTicket});
  width: 250px;
  height: 250px;
  border-bottom: 1px solid #f2f2f2;
`;

const TicketId = styled.div`
  align-items: center;
  text-align: center;
`;

const ShowTickets = ({ account }) => {
  const [listCards, setListCards] = useState([]);
  const [listRedeemedTickets, setListRedeemedTickets] = useState([]);

  const getUnredeemedTickets = async () => {
    try {
      const tokens = await TicketToken.methods.walletQuery(account).call();
      console.log("tokens: ", tokens);
      let listOfCards = [];
      tokens.map((tokenId) => {
        const card = renderCard(tokenId);
        listOfCards.push(card);
      });
      setListCards(listOfCards);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (account) getUnredeemedTickets();
  }, [account]);

  const getRedeemedTickets = async () => {
    try {
      const url = `https://jorrdaarevent.kraznikunderverse.com/qrcode/wallet/${account}`;
      const { data } = await axios.get(url, {
        headers: {
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });

      // console.log(data.data);
      const listCards = [];
      data?.data?.map((redeemedTkt) => {
        const card = renderRedeemedCard(redeemedTkt.tokenID);
        listCards.push(card);
      });
      setListRedeemedTickets(listCards.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (account) getRedeemedTickets();
  }, [account]);

  const renderCard = (tokenId) => {
    return (
      <Link
        key={tokenId}
        to={`/tickets/${tokenId}/redeem`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <TicketBox>
          {tokenId > 0 && tokenId <= 16 ? (
            <TicketImage1 />
          ) : tokenId > 16 && tokenId <= 58 ? (
            <TicketImage2 />
          ) : (
            <TicketImage3 />
          )}
          {/* <TicketImage1></TicketImage1> */}
          <TicketId>#{tokenId}</TicketId>
        </TicketBox>
      </Link>
    );
  };

  const renderRedeemedCard = (tokenId) => {
    return (
      <Link
        key={tokenId}
        to={`/tickets/${tokenId}/qrcode`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <TicketBox>
          {tokenId > 0 && tokenId <= 16 ? (
            <RedeemImage1 />
          ) : tokenId > 16 && tokenId <= 58 ? (
            <RedeemImage2 />
          ) : (
            <RedeemImage3 />
          )}
          {/* <TicketImage1></TicketImage1> */}
          <TicketId>#{tokenId}</TicketId>
        </TicketBox>
      </Link>
    );
  };
  return (
    <>
      <Background>
        <Container>
          <Title>Choose your (NFT Ticket) to redeem</Title>

          <Description>Get a QR code to enter the event</Description>

          <TicketContainer>
            {listRedeemedTickets}
            {listCards}
          </TicketContainer>
        </Container>
      </Background>
    </>
  );
};

export default ShowTickets;
