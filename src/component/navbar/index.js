import React, { useState } from "react";
import "./index.css";
import searchIcon from "./images/searchbar.png";
import ProductItem from "../ProductItem/ProductItem";
import book from "./images/book.png";
import computer from "./images/computer.png";
import mobile from "./images/mobile.png";
import fridge from "./images/fridge.png";
import headphone from "./images/headphone.png";



const Navbar = () => {
  const [selectedProduct, setSelectedProduct] = useState(1);


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
      id: 1,
      img: book,
      name: "Book",
      description: "Product description",
    },
    {
      id: 2,
      name: "Computer",
      img: computer,
      description: "Product description",
    },
    {
      id: 3,
      name: "Fridge",
      img: fridge,
      description: "Product description",
    },
    {
      id: 4,
      name: "Headphone",
      img: headphone,
      description: "Product description",
    },
    {
      id: 5,
      name: "Mobile",
      img: mobile,
      description: "Product description",
    },
    {
        id: 6,
        img: book,
        name: "Book",
        description: "Product description",
      },
      {
        id: 7,
        name: "Computer",
        img: computer,
        description: "Product description",
      },
      {
        id: 8,
        name: "Fridge",
        img: fridge,
        description: "Product description",
      },
      {
        id:9,
        name: "Headphone",
        img: headphone,
        description: "Product description",
      },
      {
        id:10,
        name: "Mobile",
        img: mobile,
        description: "Product description",
      },
      {
        id:11,
        name: "Fridge",
        img: fridge,
        description: "Product description",
      },
      {
        id:12,
        name: "Headphone",
        img: headphone,
        description: "Product description",
      },
      {
        id:13,
        name: "Mobile",
        img: mobile,
        description: "Product description",
      },
      {
        id:14,
        name: "Fridge",
        img: fridge,
        description: "Product description",
      },
     

  ];


  return (
    <div
      className="container"
      style={{
        margin: "5rem 0 0 5rem",
        width:"100%"
      }}
    >
      <div className="sidebar">
        
        <div className="search-bar">
          <div className="search-button">
            <img src={searchIcon} alt="Search" />
          </div>
          <input type="text" />
        </div>
        <div className="product-list">
          {products.map((product) => (
            <ProductItem
              selectedProduct={selectedProduct}
              key={product.id}
              product={product}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Navbar;
