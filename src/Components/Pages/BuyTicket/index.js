import React from "react";
import styled from "styled-components";

const BuyTicket = () => {
  return (
    <>
      <h1>Buy Normal Ticket</h1>
      <button>$499</button>

      <h2>Buy Tikcet + Accomodation </h2>
      <button>$999</button>

      <h3>BUy Tikcet + Accomodation + After Party </h3>
      <button>$1299</button>

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
