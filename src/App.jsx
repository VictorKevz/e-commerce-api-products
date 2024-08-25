import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [addedToCart, setAddedToCart] = useState([]); // holds ID's of added products
  const [cartClicked, setCartClicked] = useState(false);

  // Add products to the cart
  const addProducts = (products) => {
    setAddedToCart((prevProducts) => {
      const isProductInCart = prevProducts.some(
        (p) => p.title === products.title
      );
      if (isProductInCart) {
        return prevProducts.map((p) =>
          p.title === products.title ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        const { price, title, thumbnail } = products;
        return [...prevProducts, { price, title, thumbnail, quantity: 1 }];
      }
    });
  };

  // Delete products from the cart
  const deleteProducts = (currentTitle) => {
    setAddedToCart((prevProducts) => {
      return prevProducts.filter((p) => p.title !== currentTitle);
    });
  };

  const incrementQty = (productTitle) => {
    setAddedToCart((prevProducts) =>
      prevProducts.map((p) =>
        p.title === productTitle ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };
  const decrementQty = (productTitle) => {
    setAddedToCart((prevProducts) =>
      prevProducts
        .map((p) =>
          p.title === productTitle ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const toggleCart = () => {
    setCartClicked(!cartClicked);
  };
  return (
    <main className="inner-container">
      <div className="inner-container">
        <div className="header-main-wrapper">
          <Header
            query={query}
            setQuery={setQuery}
            onCartToggle={toggleCart}
            cartProducts={addedToCart}
          />
          {cartClicked && (
            <Cart
              cartProducts={addedToCart}
              onDelete={deleteProducts}
              onIncrement={incrementQty}
              onDecrement={decrementQty}
            />
          )}
        </div>

        <Products
          products={products}
          setProducts={setProducts}
          query={query}
          addedToCart={addedToCart}
          onAdd={addProducts}
          onIncrement={incrementQty}
          onDecrement={decrementQty}
        />
      </div>
    </main>
  );
}

export default App;
