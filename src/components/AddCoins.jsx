import React from "react";
import { Button, Header, Grid, Modal } from "semantic-ui-react";
import Coins from "./Coins";

function add(amount) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM5NzQ0NmY5MGU5ZjAwMjAyNGJkNzAiLCJpYXQiOjE2MDcwMzgwMjJ9.zGf6LOnEgCCOTlyw-HG6cXDFDY9EPoh1pCagvbDt-lY",
  };
  fetch("https://coding-challenge-api.aerolab.co/user/points", {
    method: "POST",
    headers,
    body: JSON.stringify({ amount: amount }),
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export default function AddCoins(props) {
  const [open, setOpen] = React.useState(false);
  const addOptions = [1000, 5000, 7500];

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>+</Button>}
    >
      <Modal.Header>Sumar monedas</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Obtener monedas</Header>
          <p>Elegí cuántas monedas querés sumar con los siguientes botones</p>
          <Grid container columns={3}>
            {addOptions.map((opt) => (
              <Grid.Column key={opt}>
                <Button
                  labelPosition="right"
                  onClick={() => {
                    add(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                  <Coins></Coins>
                </Button>
              </Grid.Column>
            ))}
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
