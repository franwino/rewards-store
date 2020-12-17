// headers and Token
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM5NzQ0NmY5MGU5ZjAwMjAyNGJkNzAiLCJpYXQiOjE2MDcwMzgwMjJ9.zGf6LOnEgCCOTlyw-HG6cXDFDY9EPoh1pCagvbDt-lY",
};

// Get User data from API
async function getUserDataApi() {
  try {
    const response = await fetch(
      "https://coding-challenge-api.aerolab.co/user/me",
      {
        method: "GET",
        headers: headers,
      }
    );
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.log("Error: ", error);
  }
}

// set State from user data
export async function setUserDataFromApi(state, setState) {
  try {
    const userDataApi = await getUserDataApi();
    const newLocalUserData = { ...state };
    newLocalUserData.name = userDataApi.name;
    newLocalUserData.coins = userDataApi.points;
    setState(newLocalUserData);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// AddCoins to API
export async function postAddCoins(amount) {
  try {
    await fetch("https://coding-challenge-api.aerolab.co/user/points", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        amount: amount,
      }),
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

// Get product list from API
async function getProducts() {
  try {
    const response = await fetch(
      "https://coding-challenge-api.aerolab.co/products",
      {
        method: "GET",
        headers: headers,
      }
    );
    const productList = await response.json();
    return productList;
  } catch (error) {
    console.log("Error: ", error);
  }
}

// set state of prodList from api
export async function getProdListFromApi(setState) {
  try {
    const prodListApi = await getProducts();
    setState(prodListApi);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// Redeem product
export async function redeemToApi(id, state, setState) {
  try {
    const fetchBody = JSON.stringify({ productId: id });
    const fetchOptions = {
      method: "POST",
      headers: headers,
      body: fetchBody,
    };
    await fetch("https://coding-challenge-api.aerolab.co/redeem", fetchOptions);
    setUserDataFromApi(state, setState);
    return true;
  } catch (error) {
    console.log("Error: ", error);
    return false;
  }
}

// Get History
export async function getHistory(setState) {
  try {
    const response = await fetch(
      "https://coding-challenge-api.aerolab.co/user/history",
      {
        method: "GET",
        headers: headers,
      }
    );
    const history = await response.json();
    setState(history);
  } catch (error) {
    console.log("Error: ", error);
  }
}
