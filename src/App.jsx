import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import ProductList from "./components/ProductList/ProductList";
import "./styles/styles.css";
import { setUserDataFromApi } from "./services/api";

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
