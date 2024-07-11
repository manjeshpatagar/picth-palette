import React from "react";
import PropTypes from "prop-types";

const ProductItem = ({ product, setSelectedProduct, selectedProduct, canvasRef }) => {

  return (
    <button onClick={async () => {


      // if (canvasRef.current) {
      //   const canvas = canvasRef.current;
      //   canvas.style.display = 'none'
      // }
      await new Promise((resolve) => setTimeout(() => resolve(''), 1200))
      setSelectedProduct(product.id)

      // if (canvasRef.current) {
      //   const canvas = canvasRef.current;
      //   canvas.style.display = 'block'
      // }
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
        </div>
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
