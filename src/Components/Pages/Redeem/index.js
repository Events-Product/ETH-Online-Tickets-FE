import React, { useState, useEffect } from "react";
import { Description, Title } from "../NoTicket";
import styled from "styled-components";
import Normal from "../../../assets/Ticket.svg";
import VIP from "../../../assets/VIP.svg";
import VVIP from "../../../assets/VVIP.svg";
import "./style.css";
import ErrorPage from "../../ErrorPage";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TicketToken from "../../../ethereum/TicketToken.js";

const Background = styled.div`
  background: #151515;
  padding: 2% 0;
`;

const Container = styled.div`
  margin: auto;
  padding: 0px 0 20px 0;
  width: 600px;
  margin-bottom: 43px;

  height: 800px;
  left: calc(50% - 530px / 2);
  border: 1px solid black;
  background: #ffffff;
  border-radius: 4px;

  @media (max-width: 800px) {
    width: 343px;
    height: 796px;
    background: #ffffff;
    border-radius: 4px;
    padding: 0;
    margin: auto;
  }
`;

const TicketBox = styled.div`
  /* width: 250px;
  height: 250px; */
  display: grid;
  justify-items: center;
  align-items: center;
  margin: auto;
  border-bottom: 1px solid #f2f2f2;
  border-radius: 3px 3px 0px 0px;

  @media (max-width: 800px) {
  }
`;

const Ticket = styled.img`
  width: 250px;
  height: 250px;
  /* background-image: url(${VIP}); */
`;

const TicketId = styled.div``;

const Forum = styled.form`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  text-align: left;
  margin-left: 10%;
  margin-right:10%;
  margin-top: 24px;
  margin-bottom: 43px;

  @media (max-width: 800px) {
    padding: 0 0 0 54px;
    margin: 0;
  }
`;

const RedeemNFT = styled.button`
  margin: 20px auto;
`;

const Redeem = ({ account }) => {
  const [user, setUser] = useState({
    fullName: "",
    displayName: "",
    email: "",
  });

  const [tokenOwned, setTokenOwned] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const onBurn = async (e) => {
    e.preventDefault();
    await saveData();
    try {
      console.log("Burning the ticket");

      // Loading page
      const result = await TicketToken.methods.burn(id).send({ from: account });

      console.log(result);

      navigate(`/tickets/${id}/qrcode`);
    } catch (err) {
      console.error(err);
    }
  };

  const saveData = async () => {
    const url = "https://jorrdaarevent.kraznikunderverse.com/users";
    const post_data = {
      name: user.fullName,
      optionalName: user.displayName, // whatsapp no.
      email: user.email,
      walletAddress: account,
      tokenId: id,
    };

    const { data } = await axios.get(url + `/${account}/${id}`, {
      headers: {
        validate: process.env.REACT_APP_VALIDATE_TOKEN,
      },
    });

    if (data.user?.tokenId) {
      await axios.patch(url + `/${id}`, post_data, {
        headers: {
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
    } else {
      await axios.post(url, post_data, {
        headers: {
          "Content-Type": "application/json",
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
    }
  };

  const checkIfTokenOwned = async () => {
    try {
      const owner = await TicketToken.methods.ownerOf(id).call();
      if (owner === account) setTokenOwned(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (account) checkIfTokenOwned();
  }, [account]);

  return (
    <>
      {tokenOwned ? (
        <Background>
          <Container>
            <Title className="title">Redeem  your NFTicket</Title>
            <Description>Get your QR Code</Description>

            <TicketBox>
              <Ticket
                src={
                  id > 0 && id <= 16 ? VVIP : id > 16 && id <= 58 ? VIP : Normal
                }
              />
              <TicketId>#{id}</TicketId>
            </TicketBox>

            <Forum onSubmit={onBurn}>
              <div>
                <label className="text">Full Name </label>
                <br />
                <input
                  required
                  type="text"
                  placeholder="Add your full name here"
                  className="input"
                  value={user.fullName}
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                ></input>
                <br />

                <label className="text"> Phone Number</label>
                <br />
                {/* <input
                  type="text"
                  className="inpt"
                  value="+91"
                  style={{ width: "50px" }}
                /> */}
                <input
                  required
                  // type="text"
                  type="tel"
                  id="phone"
                  name="phone"
                  style={{ width: "370px" }}
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  // pattern="[0-9]{10}"
                  // pattern="[1-9]{1}[0-9]{9}"
                  placeholder="Eg. +91 95XXXXXXXX"
                  className="input"
                  value={user.displayName}
                  onChange={(e) =>
                    setUser({ ...user, displayName: e.target.value })
                  }
                ></input>
                <br />

                <label className="text">Email</label>
                <br />
                <input
                  required
                  type="email"
                  placeholder="Enter your best email address here"
                  className="input"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                ></input>
                <br />
              </div>

              <RedeemNFT className="wallet"> Redeem Now </RedeemNFT>
            </Forum>
          </Container>
        </Background>
      ) : (
        <ErrorPage text={""} />
      )}
    </>
  );
};

export default Redeem;
