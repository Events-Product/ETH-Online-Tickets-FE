import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TicketToken from "../../../ethereum/TicketToken";

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

  return (
    <>
      <h1>Buy Normal Ticket</h1>
      <button onClick={() => buyTier(1)}>$499</button>
      <div>{tier1 ? tier1 : "-"}/40</div>

      <h2>Buy Tikcet + Accomodation </h2>
      <button onClick={() => buyTier(2)}>$999</button>
      <div>{tier2 ? tier2 : "-"}/30</div>

      <h3>BUy Tikcet + Accomodation + After Party </h3>
      <button onClick={() => buyTier(3)}>$1299</button>
      <div>{tier3 ? tier3 : "-"}/30</div>

      <h4>
        <br />
        <br />
        Every Tikcet Purchased will be contributing to a pool for doing Qudratic
        funding during the event.
        <br />
        <br />
        10% of every primary sale will be contributed to the pool.
      </h4>
    </>
  );
};

export default BuyTicket;
