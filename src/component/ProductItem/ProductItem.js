import React from "react";
import PropTypes from "prop-types";

const ProductItem = ({ product, onClick,selectedProduct }) => {

  return (
    <button onClick={() => onClick(product.id)} className={`product-button ${selectedProduct === product.id ? 'active_id': ''}`}>
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
          <h2>{product?.name}</h2>
          <h6>{product?.description}</h6>
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
