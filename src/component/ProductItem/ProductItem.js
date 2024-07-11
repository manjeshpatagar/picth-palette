import React, { useState } from "react";
import PropTypes from "prop-types";
import Spinner from 'react-bootstrap/Spinner';


const ProductItem = ({ product, setSelectedProduct, selectedProduct }) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <button onClick={async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(() => resolve(''), 1200))
      setSelectedProduct(product.id)
      setIsLoading(false)
    }} className={`product-button ${selectedProduct === product.id ? 'active_id' : ''}`}>
      <div className="product-item">
        {/* <img
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "25px",
            border: "1px solid black",
          }}
          src={product?.img}
        /> */}
        <div className="product-name">
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            textTransform: "capitalize"
          }}>{product?.name}</div>
          {/* <div
            style={{
              opacity: "0.7"
            }}>{"product?.description"}</div> */}
        </div>
        {isLoading && <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
      </div>
    </button>
  );
};

// ProductItem.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,

//   }).isRequired,
//   onClick: PropTypes.func.isRequired,
// };

export default ProductItem;
