import React, { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import ProductList from "./ProductList/ProductList";
import "./AppStyles/styles.css";
import { setUserDataFromApi } from "../scripts/api";

function App() {
  const initData = {
    name: "",
    coins: 0,
  };
  const [localUserData, setLocalUserData] = useState(initData);

  useEffect(() => {
    setUserDataFromApi(localUserData, setLocalUserData);
  }, []);

  return (
    <div className="App">
      <Header
        localUserData={localUserData}
        setLocalUserData={setLocalUserData}
      ></Header>
      <ProductList
        availableCoins={localUserData.coins}
        localUserData={localUserData}
        setLocalUserData={setLocalUserData}
      ></ProductList>
    </div>
  );
}

export default App;
