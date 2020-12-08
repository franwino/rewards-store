import "./header.css";
import logo from "../../assets/aerolab-logo.svg";
import headImg from "../../assets/header.png";
import UserCoins from "../UserCoins";

export default function Header(props) {
  const { state } = props;
  return (
    <div className="header">
      <div className="topbar">
        <img src={logo} alt="logo"></img>
        <UserCoins
          name={state.name}
          coins={state.coins}
          changeState={state.changeState}
        ></UserCoins>
      </div>
      <img src={headImg} className="heroImage" alt="Products"></img>
    </div>
  );
}
