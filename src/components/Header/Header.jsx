import React from "react";
import "./styles/header.css";
import logo from "../../assets/aerolab-logo.svg";
import headImg from "../../assets/header.png";
import UserCoins from "./UserCoins";
import AddCoins from "./AddCoins";
import History from "./History";

export default function Header(props) {
  const { localUserData, setLocalUserData } = props;
  return (
    <header className="header">
      <nav className="topbar">
        <img src={logo} alt="logo"></img>
        <div className="topMenu">
          <History></History>
          <div className="user-coins-add">
            <UserCoins
              name={localUserData.name}
              coins={localUserData.coins}
            ></UserCoins>
            <AddCoins
              localUserData={localUserData}
              setLocalUserData={setLocalUserData}
            ></AddCoins>
          </div>
        </div>
      </nav>
      <img src={headImg} className="heroImage" alt="Products"></img>
    </header>
  );
}
