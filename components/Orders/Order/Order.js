import React, { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";

export default function Order(props) {
  const { order } = props;
  const { product, totalPayment, createdAt, addressShipping } = order;
  const { title, poster, url, shipping } = product;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>${totalPayment} MXN</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              Fecha y Hora: <br />
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        addressShipping={addressShipping}
        title={title}
      />
      <span>Entrega estimada: {shipping}</span>
    </>
  );
}

function AddressModal(props) {
  const { showModal, setShowModal, addressShipping, title } = props;

  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h2>¡Gracias por su compra!</h2>
      <h3>Su pedido será enviado a la siguiente dirección:</h3>
      <div>
        <p>{addressShipping.name}</p>
        <p>{addressShipping.address}</p>
        <p>
          {addressShipping.state}, {addressShipping.city}{" "}
          {addressShipping.postalCode}
        </p>
        <p>{addressShipping.phone}</p>
        <p>
          Si usted tiene dudas respecto a su compra; o bien, usted desea
          solicitar algun tipo de aclaración, <a href="/">puede hacerlo aquí</a>
          .
        </p>
      </div>
    </BasicModal>
  );
}
