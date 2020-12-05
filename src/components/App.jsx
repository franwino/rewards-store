import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";

function App() {
  const initState = {
    name: "",
    coins: 0,
    sort: "price_low",
  };
  const [state, setState] = useState(initState);

  // Este useEffect deberia ir en el componente de productos
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM5NzQ0NmY5MGU5ZjAwMjAyNGJkNzAiLCJpYXQiOjE2MDcwMzgwMjJ9.zGf6LOnEgCCOTlyw-HG6cXDFDY9EPoh1pCagvbDt-lY",
    };
    fetch("https://coding-challenge-api.aerolab.co/user/me", { headers })
      .then((response) => console.log(response.json()))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;
