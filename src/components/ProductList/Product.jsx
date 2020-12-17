import React, { useState } from "react";
import buyBlue from "../../assets/buy-blue.svg";
import IconCoins from "../IconCoins";
import "./product.css";
import { redeemToApi } from "../../scripts/api";
import { Button, Modal } from "semantic-ui-react";

function ModalRedeem(props) {
  const { id, state, setState } = props;
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  return (
    <Modal
      size="mini"
      open={open}
      trigger={
        <Button
          className="button"
          onClick={() => {
            setSuccess(redeemToApi(id, state, setState));
            setOpen(true);
          }}
        >
          Canjear Ahora
        </Button>
      }
    >
      <Modal.Header>{success ? "Listo!" : "Algo salió mal..."}</Modal.Header>
      <Modal.Content>
        <p>
          {success
            ? "Canjeaste tu prodcucto exitosamente. Que lo disfrutes!"
            : "Hubo un problema a la hora de canjear el producto, intentá de nuevo más tarde."}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => setOpen(false)}>
          Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default function Product(props) {
  const {
    availableCoins,
    productData,
    localUserData,
    setLocalUserData,
  } = props;
  const canBuy = availableCoins > productData.cost;
  return (
    <div className="product">
      <div className={"canBuy"}>
        {canBuy ? (
          <img src={buyBlue} alt="Comprar" />
        ) : (
          <div className="cantAfford">
            Faltan {productData.cost - availableCoins}
            <IconCoins></IconCoins>
          </div>
        )}
      </div>
      <img src={productData.img.url} alt={productData.name}></img>
      <h5>{productData.category}</h5>
      <h4>{productData.name}</h4>
      <div className="productHover">
        <div className="cost">
          {productData.cost.toLocaleString()}
          <IconCoins></IconCoins>
        </div>
        {canBuy ? (
          <ModalRedeem
            id={productData._id}
            state={localUserData}
            setState={setLocalUserData}
          ></ModalRedeem>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
