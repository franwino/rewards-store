import React, { useState } from "react";
import { Button, Header, Grid, Modal } from "semantic-ui-react";
import IconCoins from "../../assets/IconCoins";
import { postAddCoins, setUserDataFromApi } from "../../services/api";

async function add(amount, localUserData, setLocalUserData) {
  await postAddCoins(amount);
  await setUserDataFromApi(localUserData, setLocalUserData);
}

export default function AddCoins(props) {
  const { localUserData, setLocalUserData } = props;

  const [open, setOpen] = useState(false);
  const addOptions = [1000, 5000, 7500];

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      F
      trigger={<Button>+</Button>}
    >
      <Modal.Header>Sumar monedas</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Obtener monedas</Header>
          <p>Elegí cuántas monedas querés sumar con los siguientes botones</p>
          <Grid container columns={3}>
            {addOptions.map((option) => (
              <Grid.Column key={option}>
                <Button
                  className="coinsBtn"
                  onClick={() => {
                    add(option, localUserData, setLocalUserData);
                    setOpen(false);
                  }}
                >
                  {option}
                  <IconCoins></IconCoins>
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
