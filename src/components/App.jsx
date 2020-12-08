import React, { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import "./AppStyles/styles.css";

function App() {
  const initState = {
    name: "",
    coins: 0,
    sort: "price_low",
  };
  const [state, setState] = useState(initState);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM5NzQ0NmY5MGU5ZjAwMjAyNGJkNzAiLCJpYXQiOjE2MDcwMzgwMjJ9.zGf6LOnEgCCOTlyw-HG6cXDFDY9EPoh1pCagvbDt-lY",
    };
    fetch("https://coding-challenge-api.aerolab.co/user/me", { headers })
      .then((response) => response.json())
      .then((data) => {
        let newState = { ...state };
        newState.name = data.name;
        newState.coins = data.points;
        setState(newState);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Header state={state} changeState={setState}></Header>
    </div>
  );
}

export default App;
