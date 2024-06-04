import React from "react";
import PropTypes from "prop-types";

const ProductItem = ({ product, setSelectedProduct,selectedProduct }) => {

  return (
    <button onClick={() => setSelectedProduct(product.id)} className={`product-button ${selectedProduct === product.id ? 'active_id': ''}`}>
      <div className="product-item">
        <img
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "25px",
            border: "1px solid black",
          }}
          src={product?.img}
        />
        <div className="product-name">
          <div style={{
            fontSize:'18px',
            fontWeight:'600'
          }}>{product?.name}</div>
          <div
          style={{
            opacity:"0.7"
          }}>{product?.description}</div>
        </div>
      </div>
    </button>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductItem;
