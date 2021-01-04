import IconCoins from "../../assets/IconCoins";

export default function UserCoins(props) {
  return (
    <div className="nameCoins">
      <span>{props.name}</span>
      <div className="coinsBtn">
        {props.coins.toLocaleString()}
        <IconCoins></IconCoins>
      </div>
    </div>
  );
}
