import React, { useState, useEffect } from "react";
import { Description } from "../NoTicket";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";
import ErrorPage from "../../ErrorPage";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../../config/config";

const Background = styled.div`
  background: #151515;
  padding-bottom: 12%;
  padding-top: 2%;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 530px;
  height: 536px;
  left: calc(50% - 530px / 2);
  background: white;
  border: 1px solid black;
  border-radius: 4px;
  margin: auto;

  @media (max-width: 800px) {
    width: 400px;
    margin: 20px 20px 20px 50px;
    height: 600px;
    padding: 20px 20px 20px 20px;
  }
`;

const Title = styled.div`
  font-family: "KnockOut";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  margin-top: 25px;
  display: flex;
  align-items: center;
  text-align: center;
  /* Green Leaf */
  color: #354b37;
  /* Inside auto layout */
  flex: none;
  order: 0;
  padding-top: 5%;
  flex-grow: 0;
  margin: 24px 0px;
`;

const DetailsBox = styled.div`
  /* Body Text M */
  padding: 0 15%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */

  text-align: center;

  /* Green Leaf */

  color: #354b37;
`;

const Code = styled.div`
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 7.5%;
  margin-bottom: 10%;
  justify-content: center;
`;

const QrCode = ({ account }) => {
  const [encryptedHash, setEncryptedHash] = useState(null);
  const [redeemData, setRedeemData] = useState({
    name: "",
    optionalName: "",
    email: "",
  });
  const [tokenOwned, setTokenOwned] = useState(false);
  const [tokenScanned, setTokenScanned] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const getIfTokenScanned = async () => {
    try {
      const url = `${config.apiBaseUrl}/event/${id}`;
      const res = await axios.get(url, {
        headers: {
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
      console.log(res.data?.data);

      if (res.data?.data?.timeOfScan) {
        setTokenScanned(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getIfTokenScanned();
  }, [account]);

  const getTokenRedeemData = async () => {
    try {
      const url = `${config.apiBaseUrl}/users/${account}/${id}`;
      const { data } = await axios.get(url, {
        headers: {
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
      console.log(data);
      if (data?.user?.name) setTokenOwned(true);
      // wallet address is not lowercased here
      if (data?.user?.walletAddress === account) setTokenOwned(true);
      setRedeemData(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (account) getTokenRedeemData();
  }, [account]);

  useEffect(() => {
    const run = async () => {
      const url = `${config.apiBaseUrl}/qrcode/${id}`;

      let hashFound = false;
      while (!hashFound) {
        const { data } = await axios.get(url, {
          headers: {
            validate: process.env.REACT_APP_VALIDATE_TOKEN,
          },
        });

        // console.log("encrypted data model wallet address: ", data);

        // wallet address lowercased here
        if (
          data?.walletAddress === account.toLowerCase() || // from evnets txn in defender
          data?.walletAddress === account
        ) {
          // console.log("encypted hash: ", data);
          setEncryptedHash(data?.encrypted);
          setTokenOwned(true);
          hashFound = true;
        }
      }
    };
    if (account) run();
  }, [redeemData, account]);

  if (tokenScanned) {
    return (
      // <Poap />
      // <Navigate to={`/tickets/${id}/poap`} replace />
      <div padding="10%"></div>
    );
  }

  return (
    <>
      {tokenOwned ? (
        <Background>
          <Container style={{ position: "relative" }}>
            <div
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                position: "absolute",
                top: 10,
                left: "50%",
                alignItems: "center",
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </div>
            <Title>Hurray! You redeemed it successfully 🙋‍♂️</Title>

            <Description>
              You are going to the ETH Global Event. This QR code is your access
              & you can download it or access here on the website with your
              wallet while entering ETH Global Event.
            </Description>

            <DetailsBox>
              {/* <div>Name : Digital Pratik </div>
              <div>Email : digitalpratik@gmail.com </div>
              <div>Phone Number : +91-9XXXXXXXXX</div> */}

              <div>Name: {redeemData.name}</div>
              <div>Email: {redeemData.email} </div>
              <div>Phone Number: {redeemData.optionalName}</div>
              <div>NFT Ticket : {id} </div>
            </DetailsBox>

            {encryptedHash ? (
              <Code>
                <QRCodeSVG
                  value={`https://tickets.kraznikunderverse.com/organizer?tid=${id}&owner=${account}&name=${redeemData.name}&hash=${encryptedHash}`}
                ></QRCodeSVG>
              </Code>
            ) : (
              <Code>
                Please wait while the qr code is being generated...
                <br />
                Reload and connect wallet if not displayed in 2 mins..
              </Code>
            )}
          </Container>
        </Background>
      ) : (
        <ErrorPage text={""} />
      )}
    </>
  );
};

export default QrCode;
