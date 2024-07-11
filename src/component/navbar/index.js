import React, { useEffect, useState, Suspense, useRef, useLayoutEffect } from "react";
import "./index.css";
import searchIcon from "./images/searchbar.png";
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import ProductItem from "../ProductItem/ProductItem";
import book from "./images/book.png";
import computer from "./images/computer.png";
import mobile from "./images/mobile.png";
import fridge from "./images/fridge.png";
import headphone from "./images/headphone.png";

import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState();
  const [products, setProducts] = useState([]);
  const [tmpProducts, settmpProducts] = useState([]);
  const meshRef = useRef()
  const intervalRef = useRef({ currentId: null, previousId: null })

  const canvasRef = useRef(null);


  useEffect(() => {

    console.log('selectedProduct::: ', selectedProduct)
    if (intervalRef.current.previousId !== null) {
      clearInterval(intervalRef.current.previousId)
    }
  }, [selectedProduct])
  const renderContent = async (product) => {
    return (
      <div>
        {selectedProduct
          ? <div>
            Product:{(JSON.stringify(product.s3path))}
            {
              <Suspense fallback={<div>Loading</div>}>

                <Canvas ref={canvasRef} style={{ width: 600, height: 500, border: '1px solid red' }}>
                  <ambientLight intensity={Math.PI / 5} />
                  <spotLight position={[0, -100, -300]} angle={0.10} penumbra={1} decay={0} intensity={Math.PI} />
                  <pointLight position={[0, -100, -300]} decay={0} intensity={Math.PI} />
                  {/* <Box position={[0, 0, -100]} /> */}
                  <Scene position={[product?.["3dConfig"]?.x ?? -0.10000000000000003, product?.["3dConfig"]?.y ?? -170, product?.["3dConfig"]?.z ?? -340]} path={product.s3path} scale={product?.["3dConfig"]?.scale ?? 0.5} />

                </Canvas>

                {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', rowGap: 0, columnGap: 12 }}>
                  <button onClick={e => { meshRef.current.rotation.x += 0.1 }}>x + 0.1</button>
                  <button onClick={e => { meshRef.current.rotation.x -= 0.1 }}>x - 0.1</button>
                  <button onClick={e => { meshRef.current.position.z += 10 }}>z + 10</button>
                  <button onClick={e => { meshRef.current.position.z -= 10 }}>z - 10</button>
                  <button onClick={e => { meshRef.current.position.y += 10 }}>y + 10</button>
                  <button onClick={e => { meshRef.current.position.y -= 10 }}>y - 10</button>

                </div> */}
              </Suspense>
            }
          </div>
          : "Please select a product."}
      </div>
    );
  };
  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    fetch('https://3jue1fo3z9.execute-api.ap-south-1.amazonaws.com/dev/PP_FetchProducts', {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        // Include other headers if necessary
        'Authorization': "Bearer " + localStorage.getItem("token")
      },

    })
      .then(response => {
        if (response.status === 401) {
          clearInterval(intervalRef.current.currentId)
          clearInterval(intervalRef.current.previousId)
          navigate('/login')
        }
        if (!response.ok) {
          clearInterval(intervalRef.current.currentId)
          clearInterval(intervalRef.current.previousId)
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Handle the response data
        setProducts(data)
        console.log('Success:', data);

      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
  }

  function Scene(props) {

    console.log(props.path)
    // const fbx = useLoader(FBXLoader, "/cot.fbx")//'https://pitch-palette-3d-assets.s3.ap-south-1.amazonaws.com/Trolley.FBX'
    const fbx = useLoader(FBXLoader, props.path)//'https://pitch-palette-3d-assets.s3.ap-south-1.amazonaws.com/Trolley.FBX'

    intervalRef.current.previousId = intervalRef.current.currentId
    const intervalId = setInterval(() => {
      // meshRef.current.rotation.x += 0.01
      // if (meshRef.current?.rotation?.y)
      try {
        if (meshRef.current && meshRef.current.rotation)
          meshRef.current.rotation.y += 0.01
        // meshRef.current.rotation.x += 0.01
      } catch (e) {
        console.log(e)
        clearInterval(intervalId)
      }
      // console.log('ll')
    }, 100)

    intervalRef.current.currentId = intervalId
    return (

      <primitive   {...props} ref={meshRef} object={fbx} />

    )

  }

  useEffect(() => {
    settmpProducts([...products, { id: 1, name: "pot", s3path: "/pot.fbx" }])
  }, [products])
  return (

    <div
      className="container"
      style={{
        margin: "5rem 0 0 5rem",
        width: "100%"
      }}
    >
      <div className="sidebar">

        <div className="product-list">
          {/* {JSON.stringify([...products, { id: 1, name: "pot", s3path: "/pot.fbx" }])} */}
          {tmpProducts.map((product) => (
            <ProductItem
              selectedProduct={selectedProduct}
              key={product.id}
              product={product}
              setSelectedProduct={setSelectedProduct}
              canvasRef={canvasRef}
            />
          ))}
        </div>
      </div>

      <div className="content">{renderContent(tmpProducts.filter(d => d.id === selectedProduct)[0])}</div>
    </div>
  );
};

export default Navbar;
