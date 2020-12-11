const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM5NzQ0NmY5MGU5ZjAwMjAyNGJkNzAiLCJpYXQiOjE2MDcwMzgwMjJ9.zGf6LOnEgCCOTlyw-HG6cXDFDY9EPoh1pCagvbDt-lY",
};

async function getUserDataApi() {
  try {
    const response = await fetch(
      "https://coding-challenge-api.aerolab.co/user/me",
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

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
