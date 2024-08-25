import React from "react";
import "../css/cart.css";
import QuantityControls from "./QuantityControls";
import deleteIcon from "../assets/icon-delete.svg";
import emptyIllustration from "../assets/empty-cart.webp";


function Cart({ cartProducts, onDelete, onDecrement, onIncrement }) {
  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      total += cartProducts[i].price * cartProducts[i].quantity;
    }
    return total;
  };

  return (
    <div className="cart-wrapper">
      {cartProducts.length >= 1 ? (
        <div className="filled-cart">
          <h2 className="total">{`Total = $${calculateTotal().toFixed(2)}`}</h2>

          {cartProducts.map((product) => {
            const itemTotal = (product.price * product.quantity).toFixed(2);

            return (
              <div key={product.title} className="cart-item">
                <div className="thumbnail-details-wrapper">
                  <div className="thumbnail-wrapper">
                    <img
                      src={product.thumbnail}
                      alt={`Thumbnail of ${product.title}`}
                      className="thumbnail"
                    />
                  </div>
                  <div className="price-title-wrapper">
                    <h3 className="cart-item-title">{product.title}</h3>
                    <p className="cart-item-price">{`$${product.price} x ${product.quantity} = $${itemTotal}`}</p>
                    <QuantityControls
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    productTitle={product.title}
                    quantity={product.quantity}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="delete-icon"
                  onClick={() => onDelete(product.title)}
                >
                  <img
                    src={deleteIcon}
                    alt="Delete Icon"
                    className="delete-icon-img"
                  />
                </button>
              </div>
            );
          })}

          <div className="check-out-btn-wrapper" role="button">
            <button type="button" className="checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart-wrapper">
          <h2 className="empty-cart-parag">Your cart is empty</h2>
          <img
            src={emptyIllustration}
            alt="Empty Cart Illustration"
            className="empty-img"
          />
        </div>
      )}
    </div>
  );
}

export default Cart;