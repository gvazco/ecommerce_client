import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../api/favorite";

export default function HeaderProduct(props) {
  const { product } = props;
  const { poster, title } = product;

  return (
    <Grid className="header-product">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info product={product} />
      </Grid.Column>
    </Grid>
  );
}

function Info(props) {
  const { product } = props;
  const { title, summary, price, discount, url, shipping } = product;
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadFavorites, setReloadFavorites] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, product.id, logout);
      if (size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
    setReloadFavorites(false);
  }, [product, reloadFavorites]);

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, product.id, logout);
      setReloadFavorites(true);
    }
  };

  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, product.id, logout);
      setReloadFavorites(true);
    }
  };

  return (
    <>
      <div className="header-product__title">
        {title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({
            like: isFavorite,
          })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      <div className="header-product__delivery">Entrega aprox: {shipping}.</div>
      <div
        className="header-product__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-product__buy">
        <div className="header-product__buy-price">
          <p>
            Precio Lista: ${price.toFixed(2)} <span>MXN</span>
          </p>
          <div className="header-product__buy-price-actions">
            <p>-{discount}%</p>
            <p>
              ${(price - Math.floor(price * discount) / 100).toFixed(2)}
              <span>MXN</span>
            </p>
          </div>
        </div>
        <Button
          className="header-product__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Comprar
        </Button>
      </div>
      <div className="header-product__note">
        <p>*Todos nuestros precios ya incluyen IVA</p>
      </div>
    </>
  );
}
