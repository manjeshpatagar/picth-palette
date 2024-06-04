import React, { useState } from "react";
import "./index.css";
import audioIcon from "./images/audio.png";
import searchIcon from "./images/searchbar.png";
import pitch from "./images/pitch.png";
import ProductItem from "../ProductItem/ProductItem";
import book from "./images/book.png";
import computer from "./images/computer.png";
import mobile from "./images/mobile.png";
import fridge from "./images/fridge.png";
import headphone from "./images/headphone.png";
const Navbar = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);


  const renderContent = () => {
    return (
      <div>
        {selectedProduct
          ? `No product Loaded for ${selectedProduct}`
          : "Please select a product."}
      </div>
    );
  };

  const products = [
    {
      id: "product1",
      img: book,
      name: "Book",
      description: "Product description",
    },
    {
      id: "product2",
      name: "Computer",
      img: computer,
      description: "Product description",
    },
    {
      id: "product3",
      name: "Fridge",
      img: fridge,
      description: "Product description",
    },
    {
      id: "product4",
      name: "Headphone",
      img: headphone,
      description: "Product description",
    },
    {
      id: "product5",
      name: "Mobile",
      img: mobile,
      description: "Product description",
    },
  ];


  return (
    <div className="container">
      <div className="sidebar">
        <div className="header-logo">
          <img src={pitch} alt="Pitch" />
        </div>
        <div className="search-bar">
          <div className="search-button">
            <img src={searchIcon} alt="Search" />
          </div>
          <input type="text" />
          <div className="audio-button">
            <img src={audioIcon} alt="Audio" />
          </div>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <ProductItem
              key={product?.id}
              product={product}
              onClick={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          ))}
        </div>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Navbar;
