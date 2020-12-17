import React from "react";
import "./header.css";
import logo from "../../assets/aerolab-logo.svg";
import headImg from "../../assets/header.png";
import UserCoins from "./UserCoins";
import AddCoins from "./AddCoins";
import History from "./History";

export default function Header(props) {
  const { localUserData, setLocalUserData } = props;
  return (
    <section className="header">
      <div className="topbar">
        <img src={logo} alt="logo"></img>
        <History></History>
        <div className="user-coins">
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
      <img src={headImg} className="heroImage" alt="Products"></img>
    </section>
  );
}
