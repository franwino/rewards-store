import IconCoins from "../IconCoins";

export default function UserCoins(props) {
  return (
    <div className="user">
      <span>{props.name}</span>
      <div className="coinsBtn">
        {props.coins.toLocaleString()}
        <IconCoins></IconCoins>
      </div>
    </div>
  );
}
