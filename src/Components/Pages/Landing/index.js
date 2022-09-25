import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import "./style.css";
import Popup from "reactjs-popup";
import styled from "styled-components";
// import Thumbnail from "../../../assets/Thumbnail.jpeg";
import WalletPopUp from "../../ConnectWallet/WalletPopup";
import Wallet from "../../../assets/wallet.svg";
// import Play from "../../assets/logo.png";

// const Background = styled.div`
//   background-image: url(${Thumbnail});
//   width: 100%;
//   height: auto;
// `;

const Landing = ({
  account,
  onConnectMetamask,
  onConnectWalletConnect,
  onConnectCoinbase,
  onDisconnect,
  haveTokens,
  isOrganizer,
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const userAddress = `${account?.slice(0, 4)}....${account?.slice(-4)}`;
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="#"
        variant="dark"
        className="nav"
      >
        <Container>
          <NavLink exact to="/">
            {/* <Navbar.Brand className="logo">
              <img
                alt=""
                src={}
                width="80px"
                height=""
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand> */}
          </NavLink>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {isOrganizer ? (
                <Nav.Link className="text">
                  <NavLink to="/organizer" className="text">
                    Organizer
                  </NavLink>
                </Nav.Link>
              ) : null}
              <Nav.Link className="tet">
                {/* BuyTicket */}
                <NavLink
                  exact
                  to={haveTokens ? "/tickets/show" : "/tickets/buy"}
                  className="ticket"
                >
                  Redeem
                </NavLink>
              </Nav.Link>
              <Nav.Link className="">
                {/* BuyTicket */}
                <NavLink exact to={"./video"} className="Video">
                  Buy Tickets
                </NavLink>
              </Nav.Link>
              {/* <Nav.Link href="/qrcode" className="tet">
                QrCode
              </Nav.Link>
              <Nav.Link href="/showticket" className="tet">
                ShowTickets
              </Nav.Link>
              <Nav.Link href="/redeem" className="tet">
                Redeem
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <Nav.Link className="mobile">
            {/* BuyTicket */}
            <NavLink
              exact
              to={haveTokens ? "/tickets/show" : "/tickets/buy"}
              className="mobile"
            >
              Tickets
            </NavLink>
          </Nav.Link>
          {account === "" || typeof account === "undefined" ? (
            // <button href="" className="button" onClick={onConnectWallet}>
            //   <Popup
            //     trigger={
            //       <button className="button"> Connect Wallet </button>
            //     }
            //     modal
            //     // nested
            //   >
            //     <WalletPopUp></WalletPopUp>
            //   </Popup>
            // </button>
            <>
              <button
                type="button"
                className="wallet"
                onClick={() => setOpen((o) => !o)}
              >
                Connect Wallet
              </button>

              <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <WalletPopUp
                  onConnectWalletConnect={onConnectWalletConnect}
                  onConnectCoinbase={onConnectCoinbase}
                  onConnectMetamask={onConnectMetamask}
                  closeModal={closeModal}
                />
              </Popup>
            </>
          ) : (
            <button onClick={onDisconnect} className="wallet">
              <h6>
                <span className="address">{userAddress}</span>
              </h6>
            </button>
          )}
        </Container>
      </Navbar>

      {/* <iframe
        width="100%"
        height="720"
        src="https://www.youtube.com/embed/2-CZxh1VJTc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe> */}

      {/* <Background></Background> */}
    </>
  );
};

export default Landing;
