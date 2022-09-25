import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TicketToken from "../../../ethereum/TicketToken";
import Tier1 from "../../../assets/Tier1.png";
import Tier2 from "../../../assets/Tier2.png";
import Tier3 from "../../../assets/Tier3.png";
import "./style.css";

const BuyTicket = ({ account }) => {
  const [tier1, setTier1] = useState();
  const [tier2, setTier2] = useState();
  const [tier3, setTier3] = useState();

  const fetchData = async () => {
    const tier1 = await TicketToken.methods.totalTier1Minted().call();
    setTier1(tier1);
    const tier2 = await TicketToken.methods.totalTier2Minted().call();
    setTier2(tier2);
    const tier3 = await TicketToken.methods.totalTier3Minted().call();
    setTier3(tier3);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const buyTier = async (tierNum) => {
    await TicketToken.methods.mintAccessPass(tierNum).send({ from: account });
  };

  const Container = styled.div`
    background: #151515; ;
  `;

  const TikcetBox = styled.div`
    background: white;
    height: 425px;
    width: 300px;
    border-radius: 20px;
    display: inline-block;
    margin: 20px;
  `;

  const TikcetContainer = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: center;
  `;

  const Title = styled.div`
    color: white;
    margin: 0 auto;
    display: flex;
  `;

  return (
    <>
      <Container>
        <h4 className="text">ETH Global Event</h4>

        <TikcetContainer>
          <TikcetBox>
            <img src={Tier1} width="100%" />
            <h1 className="title">Buy Normal Ticket</h1>
            <button className="button" onClick={() => buyTier(1)}>
              $499
            </button>
            <div className="number">{tier1 ? tier1 : "-"}/40</div>
          </TikcetBox>

          <TikcetBox>
            <img src={Tier2} width="100%" />
            <h2 className="title"> Ticket + Accomodation </h2>
            <button className="button" onClick={() => buyTier(2)}>
              $999
            </button>
            <div className="number">{tier2 ? tier2 : "-"}/30</div>
          </TikcetBox>

          <TikcetBox>
            <img src={Tier3} width="100%" />
            <h3 className="title"> Previous + Party </h3>
            <button className="button" onClick={() => buyTier(3)}>
              $1299
            </button>
            <div className="number">{tier3 ? tier3 : "-"}/30</div>
          </TikcetBox>
        </TikcetContainer>

        <h4 className="text">
          <br />
          Every Tikcet Purchased will be contributing to a pool for doing
          Qudratic funding during the event.
          <br />
          <br />
          10% of every primary / Secondary sale will be contributed to the pool.
        </h4>
      </Container>
    </>
  );
};

export default BuyTicket;
