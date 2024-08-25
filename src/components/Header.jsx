import React,{useState} from "react";
import "../css/header.css";
import cart from "../assets/cart.svg";

function Header({ query, setQuery,onCartToggle,cartProducts}) {

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <header className="header-wrapper">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="form-container"
      >
        <fieldset className="field">
          <label htmlFor="userQuery"></label>
          <input
            type="search"
            value={query}
            onChange={handleChange}
            id="userQuery"
            className="form-input"
            placeholder="search..."
          />
        </fieldset>
      </form>
      <button 
      type="button" 
      className="cart-icon-wrapper"
      onClick={onCartToggle}
      >
        <img src={cart} alt="Icon of a cart" className="cart-icon" />

        {cartProducts.length >= 1 && <span className="cart-num">{cartProducts.length}</span>}
      </button>
    </header>
  );
}

export default Header;
