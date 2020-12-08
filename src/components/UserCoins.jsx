import Coins from "./Coins";
import AddCoins from "./AddCoins"
import styled from "styled-components";

const Points = styled.button`
  border-radius: 20px;
  background-color: grey;
  cursor: pointer;
  color: white;
`;

export default function UserCoins(props) {
  return (
    <div className="topbar user">
      <span>{props.name}</span>
      <Points>
        {props.coins}
        <Coins></Coins>
      </Points>
      <AddCoins changeState={props.changeState}></AddCoins>
    </div>
  );
}
