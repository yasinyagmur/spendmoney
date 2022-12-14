import React from "react";
import { moneyFormat } from "../../helpers";
import "./product.css";

const Product = ({ product, basket, setBasket, total, money }) => {
  const basketItem = basket.find((item) => item.id === product.id);

  const addBasket = () => {
    const checkbasket = basket.find((item) => item.id === product.id);
    // Ürün daha önce eklenmiş
    if (checkbasket) {
      checkbasket.amount += 1;
      setBasket([
        ...basket.filter((item) => item.id !== product.id),
        checkbasket,
      ]);
    } else {
      setBasket([
        ...basket,
        {
          id: product.id,
          amount: 1,
        },
      ]);
    }
  };

  const removeBasket = () => {
    const currentbasket = basket.find((item) => item.id === product.id);
    const basketWithoutCurrent = basket.filter(
      (item) => item.id !== product.id
    );
    currentbasket.amount -= 1;
    if (currentbasket.amount === 0) {
      setBasket([...basketWithoutCurrent]);
    } else {
      setBasket([...basketWithoutCurrent, currentbasket]);
    }
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.title} />
      <h6>{product.title}</h6>
      <div className="price">${moneyFormat(product.price)}</div>
      <div className="actions">
        <button
          className="sell-btn"
          disabled={!basketItem}
          onClick={removeBasket}
        >
          Sat
        </button>
        <span className="amount">{(basketItem && basketItem.amount) || 0}</span>
        <button
          className="buy-btn"
          disabled={total + product.price > money}
          onClick={addBasket}
        >
          Al
        </button>
      </div>
    </div>
  );
};

export default Product;
