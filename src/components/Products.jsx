import React, { useState, useEffect } from "react";
import "../css/products.css";
import removeIcon from "../assets/remove.svg";
import addIcon from "../assets/add.svg";
import QuantityControls from "./QuantityControls";

function Products({
  products,
  setProducts,
  query,
  onAdd,
  addedToCart,
  onIncrement,
  onDecrement,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isProductIncart = (productTitle) => {
    return addedToCart.some((p) => p.title === productTitle);
  };

  // Helper function to get the product quantity if it's in the cart
  const getProductQuantity = (productTitle) => {
    const productInCart = addedToCart.find((p) => p.title === productTitle);
    return productInCart ? productInCart.quantity : 0;
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products/?limit=12&skip=0&select=title,price,description,images,thumbnail"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredData = products.filter(({ title }) => {
    return title.toLowerCase().includes(query.toLowerCase());
  });
  if (loading) {
    return <p className="loading">Fetching Products....</p>;
  }
  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <section className="products-wrapper">
      <div className="products-container">
        {filteredData.map((product) => (
          <div
            key={product.id}
            className={`product-card ${
              isProductIncart(product.title) && "selected"
            }`}
          >
            <div className="product-image-wrapper">
              <img src={product.images[0]} alt="" className="product-img" />
            </div>
            <h2 className="product-title">{product.title}</h2>
            <p className="product-parag">{product.description}</p>
            <div className="cart-price-wrapper">
              {isProductIncart(product.title) ? (
                <QuantityControls
                quantity={getProductQuantity(product.title)}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                productTitle={product.title}
                />
              ) : (
                <button
                  onClick={() => onAdd(product)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
              )}
              <span className="price">{`$${product.price}`}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
