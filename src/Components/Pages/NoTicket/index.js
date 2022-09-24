import React from "react";
import styled from "styled-components";

const Background = styled.div`
  background: #151515;
  padding-bottom: 22%;
  padding-top: 5%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 24px 48px;
  width: 530px;
  height: 331px;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
  margin: auto;

  @media (max-width: 800px) {
    position: absolute;
    width: 343px;
    height: 327px;
  }
`;

export const Title = styled.div`
  font-family: "Knockout";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #354b37;
  margin: 24px 0px;
  padding: 0 0% 0 0%;
  float: center;

  @media (max-width: 800px) {
    margin: 0 0 0 0;
    padding: 0;
  }
`;

export const Description = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */
  text-align: center;
  color: #354b37;
  padding: 0 10% 0 10%;
  margin: 14px 0px;

  @media (max-width: 800px) {
    margin: 24px 16px 48px 16px;
    padding: 0;
  }
`;

export const Button = styled.button``;

const BuyTicket = () => {
  return (
    <>
      <Background>
        <Container>
          <Title>You need a NFT Ticket to attend ETH Global Event</Title>

          <Description>
            Please change your wallet to see your NFT ticket or buy one
          </Description>

          <Button className="wallet">
            <a
              target={"_blank"}
              rel="noreferrer"
              className="a"
            >
              Buy ETH Global NFTicket
            </a>
          </Button>
        </Container>
      </Background>
    </>
  );
};

export default BuyTicket;
