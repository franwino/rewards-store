import React, { useState } from "react";
import buyBlue from "../../../assets/buy-blue.svg";
import IconCoins from "../../../assets/IconCoins";
import "./styles/product.css";
import { redeemToApi, setUserDataFromApi } from "../../../services/api";
import { Button, Modal } from "semantic-ui-react";

function ModalRedeem(props) {
  const { id, localUserData, setLocalUserData } = props;
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  return (
    <Modal
      size="mini"
      open={open}
      onClose={() => {
        setUserDataFromApi(localUserData, setLocalUserData);
        setOpen(false);
      }}
      trigger={
        <Button
          onClick={() => {
            setSuccess(redeemToApi(id));
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
            ? "Canjeaste tu producto exitosamente. Que lo disfrutes!"
            : "Hubo un problema a la hora de canjear el producto, intentá de nuevo más tarde."}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          onClick={() => {
            setUserDataFromApi(localUserData, setLocalUserData);
            setOpen(false);
          }}
        >
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
  const canBuy = availableCoins >= productData.cost;
  return (
    <article className="product">
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
            localUserData={localUserData}
            setLocalUserData={setLocalUserData}
          ></ModalRedeem>
        ) : (
          ""
        )}
      </div>
    </article>
  );
}
