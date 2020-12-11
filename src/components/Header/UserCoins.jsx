import IconCoins from "../IconCoins";

export default function UserCoins(props) {
  return (
    <div className="topbar user">
      <span>{props.name}</span>
      <div className="coinsBtn">
        {props.coins}
        <IconCoins></IconCoins>
      </div>
    </div>
  );
}
