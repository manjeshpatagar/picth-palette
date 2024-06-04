import React from "react";
import PropTypes from "prop-types";

const ProductItem = ({ product, onClick }) => {
  return (
    <button onClick={() => onClick(product.id)} className="product-button">
      <div className="product-item">
        <div className="product-profile"></div>
        <div className="product-name">
          <h2>{product.name}</h2>
          <h6>{product.description}</h6>
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
