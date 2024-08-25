import React from "react";
import "../css/quantityControls.css";
import removeIcon from "../assets/remove.svg";
import addIcon from "../assets/add.svg";

function QuantityControls({ quantity, onIncrement, onDecrement, productTitle }) {
  return (
    <div className="qty-wrapper">
      <button
        type="button"
        className="cart-btn minus"
        onClick={() => onDecrement(productTitle)}
      >
        <img src={removeIcon} alt="Minus Icon" className="qty-icon" />
      </button>
      <span className="qty-num">{quantity}</span>
      <button
        type="button"
        className="cart-btn plus"
        onClick={() => onIncrement(productTitle)}
      >
        <img src={addIcon} alt="Add Icon" className="qty-icon" />
      </button>
    </div>
  );
}

export default QuantityControls;