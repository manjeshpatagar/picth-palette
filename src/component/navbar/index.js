import React, { useState } from "react";
import "./index.css";
import audioIcon from "./images/audio.png";
import searchIcon from "./images/searchbar.png";
import pitch from "./images/pitch.png";
import ProductItem from "../ProductItem/ProductItem"; 

const Navbar = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderContent = () => {
    return (
      <div>
        {selectedProduct ? `No product Loaded for ${selectedProduct}` : "Please select a product."}
      </div>
    );
  };

  const products = [
    { id: "product1", name: "Tv", description: "Product description" },
    { id: "product2", name: "Mobile", description: "Product description" },
    { id: "product3", name: "Fridge", description: "Product description" },
    { id: "product4", name: "Washingmachine", description: "Product description" },
    { id: "product5", name: "Computer", description: "Product description" },
    { id: "product6", name: "Headphone", description: "Product description" },
  ];

  return (
    <div className="container">
      <div className="sidebar">
        <div className="header-logo">
          <img src={pitch} alt="Pitch" />
        </div>
        <div className="search-bar">
          <button className="search-button">
            <img src={searchIcon} alt="Search" />
          </button>
          <input type="text" />
          <button className="audio-button">
            <img src={audioIcon} alt="Audio" />
          </button>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} onClick={setSelectedProduct} />
          ))}
        </div>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Navbar;


